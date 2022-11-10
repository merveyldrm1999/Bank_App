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
  const [bank, setBank] = useState([{ name: "merve" }]);
  const [bankInput, setBankInput] = useState([1]);
  const [bankaName, setBankaName] = useState([1]);
  useEffect(() => {
    axios
      .get("http://192.168.0.133/api/banks", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjgwOTU5NDQsImxldmVsIjoyLCJ1c2VySWQiOjYsInVzZXJuYW1lIjoibWVydmUueWlsZGlyaW0ifQ.wflZdexy_ocVmnDDMnb3R_aLN-_XWIA42PVLoHO8glw",
        },
      })
      .then((res) => {
        console.log(res);
        setBank(res.data.data);
      });
  }, []);
  const yeniEkle = () => {
    setBankInput((bankInput) => [
      ...bankInput,
      ...[Math.floor(Math.random() * 99999)],
    ]);
  };

  const bankaKaydet = () => {
    axios
      .post(
        "http://192.168.0.133/api/banks",
        { bank_name: bankaName },
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjgwOTU5NDQsImxldmVsIjoyLCJ1c2VySWQiOjYsInVzZXJuYW1lIjoibWVydmUueWlsZGlyaW0ifQ.wflZdexy_ocVmnDDMnb3R_aLN-_XWIA42PVLoHO8glw",
          },
        }
      )
      .then((res) => {
        setBank((bank) => [
          ...bank,
          { banka_name: bankaName, id: res.data.id },
        ]);
      });
    alert(bankaName);
  };
  const [bankalar, setBankalar] = useState([]);
  const bankDelete = (id) => {
    alert(id);
    axios
      .delete("http://192.168.0.133/api/banks", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjgwOTU5NDQsImxldmVsIjoyLCJ1c2VySWQiOjYsInVzZXJuYW1lIjoibWVydmUueWlsZGlyaW0ifQ.wflZdexy_ocVmnDDMnb3R_aLN-_XWIA42PVLoHO8glw",
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
            <Accordion key={Math.floor(Math.random() * 99999)}>
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
                <Button onClick={yeniEkle}>
                  {" "}
                  <ControlPointOutlinedIcon />
                </Button>

                {bankInput.map((test) => {
                  return (
                    <Grid container key={Math.floor(Math.random() * 99999)}>
                      <TurVadeFaiz
                        bankInput={bankInput}
                        setBankInput={setBankInput}
                        keys={test}
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
            Lütfen Banka Adı Girin
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              value={bankaName}
              onChange={(e) => setBankaName(e.target.value)}
            />
            <button color="success" onClick={bankaKaydet}>
              Ekle
            </button>
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default Bank;
