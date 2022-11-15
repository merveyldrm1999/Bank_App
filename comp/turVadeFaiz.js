import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
const TurVadeFaiz = ({ bankalar, bankId, test, sil, setBankalar }) => {
  const [vade, setVade] = useState([]);
  const [secilenVade, setSecilenVade] = useState(test?.time_option);
  const [krediTuru, setkrediTuru] = useState(test?.credit_type);
  const [krediMik, setkrediMik] = useState(test?.interest);

  const krediTuruSecildi = (val) => {
    console.log(val);
    setkrediTuru(val);
    if (val == "1") {
      setVade([
        { val: "5Yıl", key: 6 },
        { val: "10Yıl", key: 7 },
      ]);
    } else if (val == "2") {
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
  const saved = () => {
    const gon = {
      credit_type: krediTuru,
      time_option: secilenVade,
      interest: parseFloat(krediMik),
      bank_id: bankId,
    };
    //yeni interest ekledikten sonra test.id yi res den gelen interest.id ile değiştirmen lazım
    axios
      .post("http://127.0.0.1:80/api/interests", gon, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        const ban = bankalar.map((ban) => {
          if (ban.id === res.data.bank_id) {
            ban.interests = [
              ...ban.interests,
              {
                id: res.data.id,
                bank_id: res.data.bank_id,
                interest: res.data.interest,
                time_option: res.data.time_option,
                credit_type: res.data.credit_type,
              },
            ];
          }
          return ban;
        });
        setBankalar(ban);

        alert("Banka Kaydedildi");
        // setBankalar([...bankalar, gon]);
      });

    console.log(gon);
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
          value={krediTuru}
        >
          <MenuItem value={2}>Tuketici Kredisi</MenuItem>
          <MenuItem value={1}>Konut Kredisi</MenuItem>
          <MenuItem value={3}>Mevduat Kredisi</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={3}>
        <Grid container>
          <label>Vade</label>
        </Grid>

        <Select
          onChange={(e) => setSecilenVade(e.target.value)}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={secilenVade}
        >
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
        <Button onClick={() => saved()} variant="contained">
          Kaydet
        </Button>

        <Button variant="contained" onClick={(e) => sil(test.id, bankId)}>
          Sil
        </Button>
      </Grid>
    </>
  );
};
export default TurVadeFaiz;
