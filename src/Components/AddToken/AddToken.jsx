import React, { useState } from "react";
import "./AddToken.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useDispatch, useSelector } from "react-redux";
import { setChecked, addToWatchlist } from "../../utils/store/dataSlice";

const AddToken = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const { tokenData } = useSelector((store) => store.data);

  const filtertokenData = tokenData?.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSearchItem("");
  };

  const handleCheck = (id, checked) => {
    dispatch(setChecked({ id, checked }));
  };

  const handleSubmit = () => {
    dispatch(addToWatchlist());
  };

  return (
    <>
      <Button
        sx={{ backgroundColor: "#a9e851", color: "black" }}
        onClick={handleClickOpen}
      >
        Add Token
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth={"md"}
        scroll={"paper"}
        sx={{
          height: "600px",
          top: "20%",
          color: "red",
          "& .MuiPaper-root": {
            backgroundColor: "#212124",
          },
        }}
      >
        <input
          className="search"
          placeholder="Search tokens (e.g. ETH,SOL).. "
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <DialogContent>
          {filtertokenData?.length > 0 ? (
            <>
              {" "}
              <span className="trending">Trending</span>{" "}
              {filtertokenData?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`token_item ${
                      item.checked ? "selected_item" : ""
                    }`}
                  >
                    <div className="name_container">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={24}
                        height={24}
                        style={{ borderRadius: "50%" }}
                      />
                      {item.name} {`(${item.symbol.toUpperCase()})`}
                    </div>
                    <label className="radio-container" id={item.id}>
                      {item.checked && (
                        <i
                          className="fa fa-star"
                          ng-click="alertStar(1)"
                          id="star"
                        ></i>
                      )}
                      <input
                        style={{ accentColor: "#212124" }}
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => handleCheck(item.id, e.target.checked)}
                        name={item.id}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                );
              })}{" "}
            </>
          ) : (
            <p className="token_notfound">No tokens found</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={handleClose}>
            close
          </Button>
          <Button
            autoFocus
            onClick={handleSubmit}
            sx={{ backgroundColor: "#a9e851", color: "black" }}
            disabled={!tokenData?.some((item) => item.checked == true)}
          >
            Add to Wishlist
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddToken;
