import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import { saveDetails } from "../../redux/actions/index";

import "./addData.css";

const AddMoreData = ({ isOpen, setOpen }) => {
  const dispatch = useDispatch();

  //   const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [endDate, setEndDate] = useState();

  const submitForm = () => {
    if (name && phone && address && city && street && state && endDate) {
      dispatch(
        saveDetails({
          person_name: name,
          person_phone: phone,
          address_line: address,
          street,
          city,
          state,
          address_end_date: endDate,
        })
      );
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={() => setOpen(false)} fullWidth={true}>
        <DialogTitle>Add Detail</DialogTitle>
        <DialogContent className="Dialog-content">
          <TextField
            id="standard-basic"
            label="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            required={true}
            error={!name}
          />
          <TextField
            id="standard-basic"
            label="Phone"
            type="number"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
            required={true}
            error={!phone}
          />
          <TextField
            id="standard-basic"
            label="Address Line"
            value={address}
            onChange={({ target }) => setAddress(target.value)}
            required={true}
            error={!address}
          />
          <TextField
            id="standard-basic"
            label="Street"
            value={street}
            onChange={({ target }) => setStreet(target.value)}
            required={true}
            error={!street}
          />
          <TextField
            id="standard-basic"
            label="City"
            value={city}
            onChange={({ target }) => setCity(target.value)}
            required={true}
            error={!city}
          />
          <TextField
            id="standard-basic"
            label="State"
            value={state}
            onChange={({ target }) => setState(target.value)}
            required={true}
            error={!state}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              value={endDate ? endDate : ""}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} required={true} error={!endDate} />
              )}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button onClick={submitForm}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMoreData;
