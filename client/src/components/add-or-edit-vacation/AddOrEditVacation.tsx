import "./AddOrEditVacation.css"
import axios from 'axios';
import { ChangeEvent, useState } from "react";
import { Modal } from "react-bootstrap";
import { createTheme, Box, Grid, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import { IVacation } from "../../models/IVacation";

interface IAddOrEditInput{
    destination: string,
    price: string,
    beginningDate: string,
    endingDate: string,
    description: string,
    image: string
}

const theme = createTheme();

export default function AddOrEditVacation() {

    const isModalShown = useSelector((state: AppState) => state.isAddOrEditVacationModalOpen);

    let todayDate = new Date().toISOString().split('T')[0];
    let currentVacationToAddOrEdit = { id: 0, destination: "", price: 0, beginningDate: "", endingDate: "", image: "", description: "", numOfFollowers: 0 };
    const vacationIdToEdit = useSelector((state: AppState) => state.vacationIdToEdit);
    const vacationsMap = useSelector((state: AppState) => state.vacationsMap);
    const isEdit: boolean = (vacationIdToEdit != 0);
    if (isEdit) {
        currentVacationToAddOrEdit = vacationsMap.get(vacationIdToEdit) as IVacation;
    }
    
    const dispatch = useDispatch();
    const onCancelClicked = () => {
        cleanErrors();
        dispatch({ type: ActionType.CloseAddOrEditModal });
    }

    const [isDestinationError, setIsDestinationError] = useState(false);
    const [destinationError, setDestinationError] = useState("");

    const [isPriceError, setIsPriceError] = useState(false);
    const [priceError, setPriceError] = useState("");

    const [isBeginningDateError, setIsBeginningDateError] = useState(false);
    const [beginningDateError, setBeginningDateError] = useState("");

    const [isEndingDateError, setIsEndingDateError] = useState(false);
    const [endingDateError, setEndingDateError] = useState("");

    const [isDescriptionError, setIsDescriptionError] = useState(false);
    const [descriptionError, setDescriptionError] = useState("");

    const [isImageError, setIsImageError] = useState(false);
    const [imageError, setImageError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let inputDetails: IAddOrEditInput = {
            destination: data.get('destination') as string,
            price: data.get('price') as string,
            beginningDate: data.get('beginningDate') as string,
            endingDate: data.get('endingDate') as string,
            description: data.get('description') as string,
            image: data.get('image') as string,
        };

        try {
            validateInput(inputDetails);

            const vacation: IVacation = {
                id: currentVacationToAddOrEdit.id,
                destination: inputDetails.destination,
                price: +inputDetails.price,
                beginningDate: inputDetails.beginningDate,
                endingDate: inputDetails.endingDate,
                image: inputDetails.image,
                description: inputDetails.description,
                numOfFollowers: currentVacationToAddOrEdit.numOfFollowers
            }
            if (!isEdit) {//The action type is add.
                let vacationResponse = await axios.post("http://localhost:3001/vacations/", vacation);
                let newVacationId = vacationResponse.data;
                vacation.id = newVacationId;
            }
            else { //The action type is edit
                await axios.put("http://localhost:3001/vacations/", vacation);
            }
            dispatch({ type: ActionType.CloseAddOrEditModal });

        }
        catch (e: any) {
            if (e.message !== "ClientError"){
              alert("There was an error, please try again later.");
            }
            console.error(e); 
          }
    }

    const validateInput = (inputDetails: IAddOrEditInput) => {
        let isInputDataLegal: boolean = true;
        if (inputDetails.destination == "") {
            setIsDestinationError(true);
            setDestinationError("Please enter destination");
            isInputDataLegal = false;
        }
        else if(inputDetails.destination.length>12){
            setIsDestinationError(true);
            setDestinationError("The maximum number of characters permitted is 12");
            isInputDataLegal = false;
        }

        let priceInput = +inputDetails.price;
        if (inputDetails.price == "") {
            setIsPriceError(true);
            setPriceError("Please enter price");
            isInputDataLegal = false;
        }
        else if (priceInput > 50000 || priceInput < 1) {
            setIsPriceError(true);
            setPriceError("Please enter price between 1 and 50000");
            isInputDataLegal = false;
        }

        if (inputDetails.beginningDate == "") {
            setIsBeginningDateError(true);
            setBeginningDateError("Please enter beginning date");
            isInputDataLegal = false;
        }

        if (inputDetails.endingDate == "") {
            setIsEndingDateError(true);
            setEndingDateError("Please enter ending date");
            isInputDataLegal = false;
        }

        if(inputDetails.beginningDate>=inputDetails.endingDate){
            setIsBeginningDateError(true);
            setIsEndingDateError(true);
            setEndingDateError("The ending date should be after beginning date");
            isInputDataLegal = false;
        }

        if (inputDetails.image == "") {
            setIsImageError(true);
            setImageError("Please enter image url");
            isInputDataLegal = false;
        }

        if (inputDetails.description == "") {
            setIsDescriptionError(true);
            setDescriptionError("Please enter description");
            isInputDataLegal = false;
        }
        else if(inputDetails.description.length>1000){
            setIsDescriptionError(true);
            setDescriptionError("The maximum number of characters permitted is 1000");
            isInputDataLegal = false;
        }

        if(!isInputDataLegal){
            throw new Error("ClientError");
        }
    }

    const cleanErrors = () => {
        setIsDestinationError(false);
        setDestinationError("");

        setIsPriceError(false);
        setPriceError("");

        setIsBeginningDateError(false);
        setBeginningDateError("");

        setIsEndingDateError(false);
        setEndingDateError("");

        setIsImageError(false);
        setImageError("");

        setIsDescriptionError(false);
        setDescriptionError("");
    };

    return (
        <Modal className="add-or-edit-vacation" show={isModalShown}>
            <Modal.Header>
                <h3>{isEdit? "Edit": "Add"} Vacation</h3>
            </Modal.Header>
            <Modal.Body>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    defaultValue={currentVacationToAddOrEdit.destination}
                                    required
                                    fullWidth
                                    autoFocus
                                    id="destination"
                                    label="Destination"
                                    name="destination"
                                    error={isDestinationError}
                                    helperText={destinationError}
                                    onChange={() => { setIsDestinationError(false); setDestinationError(""); }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    defaultValue={(currentVacationToAddOrEdit.price === 0) ? "" : currentVacationToAddOrEdit.price}
                                    name="price"
                                    required
                                    fullWidth
                                    id="price"
                                    label="Price"
                                    type="number"
                                    error={isPriceError}
                                    helperText={priceError}
                                    onChange={() => { setIsPriceError(false); setPriceError(""); }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    InputProps={{ inputProps: { min: todayDate } }}
                                    defaultValue={currentVacationToAddOrEdit.beginningDate}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    fullWidth
                                    id="beginningDate"
                                    label="Beginning Date"
                                    name="beginningDate"
                                    type="date"
                                    error={isBeginningDateError}
                                    helperText={beginningDateError}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {setIsBeginningDateError(false); setBeginningDateError(""); }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    InputProps={{ inputProps: { min: currentVacationToAddOrEdit.beginningDate } }}
                                    defaultValue={currentVacationToAddOrEdit.endingDate}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    fullWidth
                                    id="endingDate"
                                    label="Ending Date"
                                    name="endingDate"
                                    type="date"
                                    error={isEndingDateError}
                                    helperText={endingDateError}
                                    onChange={() => { setIsEndingDateError(false); setEndingDateError(""); }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    defaultValue={currentVacationToAddOrEdit.image}
                                    required
                                    fullWidth
                                    autoFocus
                                    id="image"
                                    label="Enter Image URL"
                                    name="image"
                                    error={isImageError}
                                    helperText={imageError}
                                    onChange={() => { setIsImageError(false); setImageError(""); }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    defaultValue={currentVacationToAddOrEdit.description}
                                    required
                                    fullWidth
                                    autoFocus
                                    id="description"
                                    label="Description"
                                    name="description"
                                    error={isDescriptionError}
                                    helperText={descriptionError}
                                    onChange={() => { setIsDescriptionError(false); setDescriptionError(""); }}
                                />
                            </Grid>
                        </Grid>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                               {isEdit? "Edit": "Add"}
                            </Button>
                            <Button
                                onClick={onCancelClicked}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </div>
                </Box>
            </Modal.Body>
        </Modal >
    );

}