import React from 'react';
import { makeStyles } from '@mui/styles';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';


const useStyles = makeStyles({
    bind: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px'
    },
    buttonPadding: {
        padding: '20px 120px',
        borderStyle: 'dashed',
        marginTop: '10px',
        position: 'relative'
    },
    contentBind: {
        display: 'flex',
        alignItems: 'center'
    },
    color: {
        color: '#8F8F8F',
        fontSize: '14px'
    },
    choose: {
        color: '#8BC2FF',
        fontSize: '14px',
        position: 'absolute',
        left: '305px',
        top: '14px',
        padding: '7px 8px',
        backgroundColor: 'white'
    },
    dragColor: {
        color: '#000',
        fontSize: '14px'
    },
    whiteStyle: {
        color: ({ palette: { white } }) => white.main
    },
    blackStyle: {
        color: ({ palette: { black } }) => black.main
    },
});

function FileUpload()
{
    const classes = useStyles();
    const [forColor, setForColor] = React.useState()
    const profileUpload = () =>
    {
        setForColor(true)
    }
    return (
        <MDBox
            sx={{
                width: 800,
                height: 200,
                backgroundColor: ({ palette: { white } }) => white.main,
                padding: '32px 40px'
            }}
        >
            <MDTypography variant="h5">
                Upload File
            </MDTypography>
            <MDBox
                sx={{ border: 1 }}
                className={classes.buttonPadding}
            >
                <div className={classes.contentBind}>
                    <ArrowCircleUpIcon />
                    <span
                        className={classes.dragColor}>Drag and Drop files here or</span>
                    <input
                        id="contained-button-file"
                        type="file"
                        className={forColor ? classes.blackStyle : classes.whiteStyle}
                        onChange={(e) => profileUpload(e)}
                    />
                    <label htmlFor="contained-button-file">
                        <span className={classes.choose}>
                            Choose File
                        </span>
                    </label>
                </div>
            </MDBox>
            <div className={classes.bind}>
                <MDTypography variant="h6" className={classes.color}>
                    File Supported: CSV, XSLS
                </MDTypography>
                <MDTypography variant="h6" className={classes.color}>
                    Maximum size: 5MB
                </MDTypography>
            </div>
        </MDBox>
    );
}
export default FileUpload;
