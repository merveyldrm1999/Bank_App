import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
const TurVadeFaiz = ({ bankInput, setBankInput, keys }) => {
  const [vade, setVade] = useState([]);
  const [krediTuru, setkrediTuru] = useState("");
  const [krediMik, setkrediMik] = useState("");
  const [bankalar, setBankalar] = useState([]);

  const krediTuruSecildi = (val) => {
    setkrediTuru(val);
    if (val == "Konut") {
      setVade([
        { val: "5Yıl", key: "5" },
        { val: "10Yıl", key: "10" },
      ]);
    } else if (val == "Tüketici") {
      setVade([
        { val: "12Ay", key: "12" },
        { val: "24Ay", key: "24" },
        { val: "36Ay", key: "36" },
      ]);
    } else {
      setVade([
        { val: "3Ay", key: "3" },
        { val: "6Ay", key: "6" },
        { val: "12Ay", key: "12" },
      ]);
    }
  };
  const sil = () => {
    const bak = bankInput.filter((bak) => bak !== keys);
    console.log(bak);
    console.log(keys);
    setBankInput(bak);
  };

  const saved = () => {
    const gon = { tur: krediTuru, vade: vade, miktar: krediMik };
    // axios.post("url", gon).then((res) => {
    //   alert("başarılı");
    // });
  };
  return (
    <>
      <Grid item xs={3}>
        <Grid container>
          <label>Kredi Türü</label>
        </Grid>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e) => krediTuruSecildi(e.target.value)}
        >
          <MenuItem value={"Tuketici"}>Tuketici Kredisi</MenuItem>
          <MenuItem value={"Konut"}>Konut Kredisi</MenuItem>
          <MenuItem value={"Mevduat"}>Mevduat Kredisi</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={3}>
        <Grid container>
          <label>Vade</label>
        </Grid>

        <Select labelId="demo-simple-select-label" id="demo-simple-select">
          {vade.map((vadem) => {
            return <MenuItem value={vadem.key}> {vadem.val}</MenuItem>;
          })}
        </Select>
      </Grid>
      <Grid item xs={3}>
        <Grid container>
          <label>Aylık Faiz Oranı</label>
        </Grid>
        <TextField
          onChange={(e) => setkrediMik(e.target.value)}
          value={krediMik}
          id="outlined-basic"
          variant="outlined"
          type={"number"}
        />
      </Grid>
      <Grid item xs={3} pl={5}>
        <Grid container>İşlemler</Grid>
        <Button onclick={saved} variant="contained">
          Kaydet
        </Button>
        <Button variant="contained" onClick={sil}>
          Sil
        </Button>
      </Grid>
    </>
  );
};
export default TurVadeFaiz;
