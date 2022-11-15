import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { useState } from "react";
import { Container } from "@mui/system";

const Hesaplama = () => {
  const [value, setValuee] = useState("1");

  const handleChange = (event, newValue) => {
    setValuee(newValue);
  };

  const [vade, setVade] = useState([]);
  const [getVade, setGetVade] = useState([]);
  const [krediTuru, setkrediTuru] = useState("");
  const [krediMik, setkrediMik] = useState("");
  const [bankalar, setBankalar] = useState([]);

  const krediTuruSecildi = (val) => {
    setkrediTuru(val);

    if (val == "Konut") {
      setVade([
        { val: "5Yıl", key: "6" },
        { val: "10Yıl", key: "7" },
      ]);
    } else {
      setVade([
        { val: "12Ay", key: "3" },
        { val: "24Ay", key: "4" },
        { val: "36Ay", key: "5" },
      ]);
    }
  };
  const bankalariGetir = () => {
    axios
      .get("http://127.0.0.1:80/api/banks", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setBankalar(res.data.banks);
      });
    // .catch((err) => {
    //   alert(err.response.data.err);
    // });
  };

  const mevduatbankalariGetir = () => {};
  return (
    <Container>
      <Box sx={{ width: "100%", typography: "body1" }} mt={20}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Kredi Faizi" value="1" />
              <Tab label="Mevduat Faizi" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* Kredi Faizi */}
            <form>
              <Grid container>
                <Grid item xs={3}>
                  <Grid container>
                    <label>Kredi Türü</label>
                  </Grid>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => krediTuruSecildi(e.target.value)}
                  >
                    <MenuItem value={"Tuketici"}>Tüketici Kredisi</MenuItem>
                    <MenuItem value={"Konut"}>Konut Kredisi</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={3}>
                  <Grid container>
                    <label>Vade</label>
                  </Grid>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => setGetVade(e.target.value)}
                    value={getVade}
                  >
                    {vade.map((vadem) => {
                      return (
                        <MenuItem value={vadem.key}> {vadem.val}</MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={3}>
                  <Grid container>
                    <label>Kredi Miktarı</label>
                  </Grid>
                  <TextField
                    onChange={(e) => setkrediMik(e.target.value)}
                    value={krediMik}
                    type={"number"}
                    id="outlined-basic"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3} pl={5}>
                  <Grid container>İşlemler</Grid>
                  <Button variant="contained" onClick={bankalariGetir}>
                    Bul
                  </Button>
                </Grid>
              </Grid>
            </form>

            {bankalar.map((bank) => {
              return (
                <Box sx={{ border: 1 }} mt={2}>
                  <label>{bank.bankName}</label>
                  <label>
                    {(bank * krediMik) / 100 + parseFloat(krediMik)}
                  </label>
                </Box>
              );
            })}
          </TabPanel>
          <TabPanel value="2">
            <Grid container>
              <Grid item xs={4}>
                <Grid container>
                  <label>Vade</label>
                </Grid>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-selecdt"
                >
                  <MenuItem value={"3"}>3Ay</MenuItem>
                  <MenuItem value={"6"}>6Ay</MenuItem>
                  <MenuItem value={"12"}>12Ay</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <label>Kredi Mik</label>
                </Grid>
                <TextField
                  onChange={(e) => setkrediMik(e.target.value)}
                  value={krediMik}
                  type={"number"}
                  id="outlined-basic"
                  label="Outlined"
                />
              </Grid>
              <Grid item xs={4} pl={5}>
                <Grid container>İşlemler</Grid>
                <Button variant="contained" onClick={mevduatbankalariGetir}>
                  Bul
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};
export default Hesaplama;
