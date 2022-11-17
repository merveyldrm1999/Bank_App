import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Toolbar,
  Typography,
  withTheme,
} from "@mui/material";
import axios from "axios";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import TurVadeFaiz from "../comp/turVadeFaiz";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  background: "white",
  p: 4,
};
const Bank = () => {
  const [bank, setBank] = useState([]);
  const [bankaName, setBankaName] = useState([1]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:80/api/banks", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res);
        setBank(res.data.data);
      });
  }, []);
  const yeniEkle = (bankamID) => {
    const yeniBankalarim = bank.map((ban) => {
      if (ban.id === bankamID) {
        ban.interests = [
          ...ban.interests,
          {
            id: Math.floor(Math.random() * 99999),

            bank_id: 0,
            interest: 0,
            time_option: 0,
            credit_type: 0,
          },
        ];
      }
      return ban;
    });
    console.log(yeniBankalarim);
    setBank(yeniBankalarim);
  };
  const sil = (interestId, bankaId) => {
    axios
      .delete("http://127.0.0.1:80/api/interests", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
        data: { id: interestId, bank_id: bankaId },
      })
      .then((res) => {
        if (res.status == 200) {
          const yeniBanka = bank.map((b) => {
            if (b.id === bankaId) {
              b.interests = b.interests.filter((i) => i.id !== interestId);
            }
            return b;
          });
          console.log(yeniBanka);
          setBank(yeniBanka);
        }
      })
      .catch((err) => {
        alert("hata var");
      });
  };

  const bankaKaydet = () => {
    axios
      .post(
        "http://127.0.0.1:80/api/banks",
        { bank_name: bankaName },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setBank((bank) => [
            ...bank,
            { banka_name: bankaName, id: res.data.id },
          ]);
        }
      });
    alert(bankaName);
  };
  const bankDelete = (id) => {
    alert(id);
    axios
      .delete("http://127.0.0.1:80/api/banks", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
        data: {
          id: parseInt(id),
        },
      })
      .then((res) => {
        const bbak = bank.filter((b) => b.id != id);
        setBank(bbak);
      });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Grid mt={15}>
        <Grid container mt={15}>
          <Button onClick={handleOpen}>Banka Ekle</Button>
        </Grid>
        {bank.map((bankam) => {
          return (
            <Accordion key={bankam.bank_name + bankam.id + bankam.interests}>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{bankam.bank_name}</Typography>
                <Button
                  onClick={() => bankDelete(bankam.id)}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Button onClick={(e) => yeniEkle(bankam.id)}>
                  <ControlPointOutlinedIcon />
                </Button>
                {bankam.interests?.map((test) => {
                  return (
                    <Grid
                      container
                      key={
                        bankam.bank_name + bankam.id + bankam.interests.length
                      }
                    >
                      <TurVadeFaiz
                        setBankalar={setBank}
                        keys={test.id}
                        test={test}
                        sil={sil}
                        bankalar={bank}
                        bankId={bankam.id}
                      />
                    </Grid>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Lütfen Banka Adı Giriniz
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              value={bankaName}
              onChange={(e) => setBankaName(e.target.value)}
            />
            <button color="success" onClick={bankaKaydet}>
              Add
            </button>
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default Bank;
