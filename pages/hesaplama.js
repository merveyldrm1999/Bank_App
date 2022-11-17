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
import axios from "../config/axios";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { useState } from "react";
import { Container } from "@mui/system";

const Calculation = () => {
  const [value, setValuee] = useState("1");

  const handleChange = (event, newValue) => {
    setValuee(newValue);
  };

  const [vade, setVade] = useState([]);
  const [getVade, setGetVade] = useState([]);
  const [getMevduatVade, setGetMevduatVade] = useState([]);
  const [krediTuru, setkrediTuru] = useState("");
  const [krediMik, setkrediMik] = useState("");
  const [bankalar, setBankalar] = useState([]);
  const [mevduat, setMevduat] = useState([]);

  const vadeler = [
    { key: 3, val: 12 },
    { key: 4, val: 24 },
    { key: 5, val: 36 },
    { key: 6, val: 5 },
    { key: 7, val: 10 },
  ];
  const krediTuruSecildi = (val) => {
    setkrediTuru(val);

    if (val == 1) {
      setVade([
        { val: "5Yıl", key: 6 },
        { val: "10Yıl", key: 7 },
      ]);
    } else if (val == 2) {
      setVade([
        { val: "12Ay", key: 3 },
        { val: "24Ay", key: 4 },
        { val: "36Ay", key: 5 },
      ]);
    } else {
      setVade([
        { val: "3Ay", key: 1 },
        { val: "6Ay", key: 2 },
        { val: "12Ay", key: 3 },
      ]);
    }
  };

  const bankalariGetir = () => {
    axios
      .get("banks")
      .then((res) => {
        console.log(res);

        let b = res.data.data.filter((bank) => {
          let newInt = bank.interests.filter((i) => {
            if (i.credit_type === krediTuru && i.time_option === getVade) {
              return i;
            }
          });

          if (newInt.length !== 0) {
            bank.interests = newInt;
            return bank;
          }
        });
        setBankalar(b);
      })
      .catch((err) => {
        console.log(err);
        alert("Hata Var");
      });
  };

  const mevduatbankalariGetir = () => {
    axios
      .get("banks")
      .then((res) => {
        console.log(res);

        let b = res.data.data.filter((bank) => {
          console.log(bank);
          let newInt = bank.interests.filter((i) => {
            console.log(getVade);
            if (i.time_option === getMevduatVade && i.credit_type === 3) {
              return i;
            }
          });

          if (newInt.length !== 0) {
            bank.interests = newInt;
            return bank;
          }
        });
        console.log(mevduat);
        setMevduat(b);
        console.log(mevduat);
      })
      .catch((err) => {
        console.log(err);
        alert("Hata Var");
      });
  };
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
                    <MenuItem value={2}>Tüketici Kredisi</MenuItem>
                    <MenuItem value={1}>Konut Kredisi</MenuItem>
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
              return bank.interests.map((i) => {
                console.log(i);
                console.log(i.time_option);
                return (
                  <Box sx={{ border: 1 }} mt={2}>
                    Banka Adı: <label>{bank.bank_name}</label>
                    <br />
                    Toplam Geri Ödeme:
                    <label>
                      {(krediMik *
                        i.interest *
                        vadeler.find((v) => v.key === i.time_option).val) /
                        3650}
                    </label>
                    TL
                    <br />
                    Hesaba Yatacak Para:
                    <label>
                      {(krediMik *
                        i.interest *
                        vadeler.find((v) => v.key === i.time_option).val) /
                        3650 -
                        i.interest}
                    </label>
                    TL
                    <br />
                    Tüketici Kredisi:
                    <label>
                      {vadeler.find((v) => v.key === i.time_option).val}
                    </label>
                    Ay Vade
                    <br />
                    Aylık Faiz:%
                    <label>{i.interest}</label>
                    <br />
                    Aylık Ödeme:
                    <label>
                      {(krediMik *
                        i.interest *
                        vadeler.find((v) => v.key === i.time_option).val) /
                        3650 /
                        i.time_option}
                    </label>
                    TL
                  </Box>
                );
              });
            })}
          </TabPanel>
          <TabPanel value="2">
            <form>
              <Grid container>
                <Grid item xs={4}>
                  <Grid container>
                    <label>Vade</label>
                  </Grid>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-selecdt"
                    onChange={(e) => setGetMevduatVade(e.target.value)}
                    value={getMevduatVade}
                  >
                    <MenuItem value={3}>3Ay</MenuItem>
                    <MenuItem value={6}>6Ay</MenuItem>
                    <MenuItem value={12}>12Ay</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <Grid container>
                    <label>Yatırılacak Para</label>
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
            </form>
            {mevduat.map((bank) => {
              return bank.interests.map((i) => {
                console.log(mevduat);
                console.log(i);
                console.log(i.time_option);
                return (
                  <Box sx={{ border: 1 }} mt={2}>
                    Banka Adı: <label>{bank.bank_name}</label>
                    <br />
                    Toplam Geri Ödeme:
                    <label>
                      {(krediMik *
                        i.interest *
                        vadeler.find((v) => v.key === i.time_option).val) /
                        3650}
                    </label>
                    TL
                    <br />
                    Hesaba Yatacak Para:
                    <label>
                      {(krediMik *
                        i.interest *
                        vadeler.find((v) => v.key === i.time_option).val) /
                        3650 -
                        i.interest}
                    </label>
                    TL
                    <br />
                    Tüketici Kredisi:
                    <label>
                      {vadeler.find((v) => v.key === i.time_option).val}
                    </label>
                    Ay Vade
                    <br />
                    Aylık Faiz:%
                    <label>{i.interest}</label>
                    <br />
                    Aylık Ödeme:
                    <label>
                      {(krediMik *
                        i.interest *
                        vadeler.find((v) => v.key === i.time_option).val) /
                        3650 /
                        i.time_option}
                    </label>
                    TL
                  </Box>
                );
              });
            })}
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};
export default Calculation;
