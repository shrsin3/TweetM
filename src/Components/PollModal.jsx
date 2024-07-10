import {
    Avatar,
    Box, Button,
    Container,
    Divider, FormControl,
    Grid,
    IconButton, InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import {
    CalendarIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon,
} from "@heroicons/react/outline";
import AddIcon from '@mui/icons-material/Add';
import {useForm, useFieldArray} from "react-hook-form";
import ModalClose from '@mui/joy/ModalClose';
import {ModalDialog} from "@mui/joy";
import {SuccessModal} from "./SuccessModal";


const PollModal= (props) => {
    const toogle = props.toggle;
    const action = props.action;
    const selected = props.gif;
    const post = props.addPost;
    const poll = props.addPoll;
    const addPoll = props.handleAddPoll;
    const [input, setInput] = useState("");
    const [isPollRemoved, setIsPollRemoved] = useState(false);
    const [successModalState, setSuccessOpen] = useState(false);

    const handleOpenSuccessModal = ()=>{
        setSuccessOpen(!successModalState);
    }

    const form = useForm({
        mode: "onChange",
        defaultValues: {
            choice1: "",
            choice2: "",
            age: 0,
            choices: [{choice: ""},{choice: ""}]
        }
    });
    const {register,control, handleSubmit,
    formState, handleChange} = form;
    const {errors} = formState

   const {fields,
       append} =  useFieldArray({
        name: "choices",
        control
    })
    const onSubmit = ()=>{
        console.log("Tweet Posted!")
        handleOpenSuccessModal();
        action();
    }

    return <>
        <SuccessModal toggle={successModalState} action={handleOpenSuccessModal}></SuccessModal>
        <Modal
        open={toogle}
        onClose={action}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <ModalDialog sx={{paddingBottom: 0, overflowX: "auto", width: "50%"}}>
        <ModalClose onClick={action}/>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Container sx={{bgcolor: "white", textAlign:"left", padding: "1rem", alignSelf: "center",
              borderRadius: "1rem"}}>
            <div className="flex border-b border-gray-200 p-3 space-x-3">
                <Avatar className={"w-full divide-y divide-gray-200"}
                        sx={{ backgroundColor: "#ff5722" }}>H</Avatar>
                <div className="w-full divide-y divide-gray-200">
                    <div>

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="What's happening?"
                            className="w-full border-none focus:ring-0 text-lg placeholder-gray-500 tracking-wide min-h-[50px] text-gray-500"
                            rows="1"
                        ></textarea>
                        {/*<p>{errors.Question?.message}</p>*/}
                        {selected && (
                            <>
                                <img
                                    src={selected.url}
                                    className="gif-preview"
                                    alt="Selected GIF"
                                />
                            </>
                        )}
                    </div></div></div>
            <Grid container spacing={2} sx={{marginTop: 1}}>
                {post && <><Grid item xs={1}>
                    <Avatar className={"w-full divide-y divide-gray-200"}
                            sx={{ backgroundColor: "#ff5722" }}>H</Avatar>
                </Grid>
                <Grid item xs={11}>
                    <TextField placeholder="Add Another Post..." label="" variant="standard" multiline
                               rows={2}
                               className="w-full border-none focus:ring-0 text-lg placeholder-gray-500 tracking-wide min-h-[50px] text-gray-500"
                               {...register("Question", {
                                   required: {
                                       value: true,
                                       message: "Question is required"}
                               })}/>
                </Grid>
                </>}
                {!isPollRemoved && poll &&  <><Grid item xs={1}>
                </Grid>
                <Grid item xs={11}>
                <Box sx={{margin: 0, padding: 0, border: "1px solid grey", borderRadius: "1rem"}}>
                <Grid container spacing={2} sx={{padding: 3}}>
                    {fields.map((field, index)=>{
                        const indxStr = (index+1).toString();
                        return (<>
                        <Grid item xs={11}>
                            <TextField label={"Choice"+indxStr}
                                       type={"text"}
                                       variant="outlined" fullWidth={true}
                                       {...register(`choice.${index}.choice`,{
                                           required: {
                                               value: true,
                                               message: "Choice is required"}
                                       })}/>
                            {/*<p>{errors.choice?.[index]?.choice?.message}</p>*/}
                        </Grid>
                            {index === (fields.length-1)?<Grid item xs={1} textAlign={"center"}>
                                <IconButton onClick={()=>append({
                                    choice: ""
                                })}>
                                    <AddIcon ></AddIcon>
                                </IconButton>
                            </Grid>: <Grid item xs={1}>
                                <></>
                            </Grid>}
                        </>)
                    })}
                </Grid>
                    <Divider  />
                    <Container sx={{padding: 3}}>
                    <Typography variant={"body1"}>Poll length</Typography>
                        <Box width="100%"
                            display="flex"
                            justifyContent="space-between">
                        <FormControl sx={{ flex: 1, marginRight: 1 }}>
                            <InputLabel id="demo-simple-select-label">Days</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Days"
                                onChange={handleChange}
                                {...register(`days`,{
                                    required: {
                                        value: true,
                                        message: "Days is required"}
                                })}
                            >
                                {[...Array(8)].map((e, index) =>{
                                    return (
                                        <MenuItem value={index}>{index}</MenuItem>
                                    )})}
                            </Select>
                        </FormControl>
                            {/*<p>{errors.days?.message}</p>*/}
                        <FormControl sx={{ flex: 1, marginRight: 1 }}>
                            <InputLabel id="demo-simple-select-label">Hours</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Hours"
                                onChange={handleChange}
                                {...register(`hours`,{
                                    required: {
                                        value: true,
                                        message: "Hours is required"}
                                })}
                            >
                                {[...Array(24)].map((e, index) =>{
                                    return (
                                        <MenuItem value={index}>{index}</MenuItem>
                                    )})}
                            </Select>
                        </FormControl>
                            {/*<p>{errors.hours?.message}</p>*/}
                        <FormControl sx={{ flex: 1, marginRight: 1 }}>
                            <InputLabel id="demo-simple-select-label">Minutes</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Minutes"
                                onChange={handleChange}
                                {...register(`minutes`,{
                                    required: {
                                        value: true,
                                        message: "Minutes is required"}
                                })}
                            >
                                {[...Array(61)].map((e, index) =>{
                                    return (
                                        <MenuItem value={index}>{index}</MenuItem>
                                    )})}
                            </Select>
                        </FormControl>
                            {/*<p>{errors.minutes?.message}</p>*/}
                        </Box>
                    </Container>
                    <Divider  />
                    <Button fullWidth sx={{p:2, color: "red"}}
                            onClick={()=>{
                                setIsPollRemoved(true);
                                addPoll();
                            }}>Remove Poll</Button>
                </Box>
                </Grid>
                </>}
            </Grid>
            <Divider sx={{marginTop: 2}}/>
            <div className="flex items-center justify-between pt-2">
                <div className="flex">
                    <IconButton>
                        <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                    </IconButton>
                    <IconButton>
                        <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                    </IconButton>
                    <IconButton onClick={()=>{
                        setIsPollRemoved(false)
                        addPoll();
                    }}
                                disabled={poll}>
                        <ChartBarIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                    </IconButton>
                    <IconButton >
                        <CalendarIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                    </IconButton>
                    <IconButton>
                        <LocationMarkerIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                    </IconButton>
                </div>
                <button
                    // disabled={!input.trim()}
                    className="bg-blue-400 text-white px-4 py-2 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                    disabled={!formState.isValid}
                >
                    Tweet
                </button>
            </div>
        </Container>
        </form>
        </ModalDialog>
        </Modal>
    </>

}

export default PollModal;