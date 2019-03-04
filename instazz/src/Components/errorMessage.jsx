import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

/*
 * Elements to manage error message
 */

// Icon types depending on error type
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

/*
 * Create global container for error message
 */
function MySnackbarContent(props) {

    // Parameters
    const { message, onClose, variant } = props;
    const Icon = variantIcon[variant];

    // Get type of error depending on variant variable
    var classToUse;
    if (variant === "success") classToUse = "App-message-success"
    else if (variant === "error") classToUse = "App-message-error"
    else if (variant === "info") classToUse = "App-message-info"
    else if (variant === "warning") classToUse = "App-message-warning"

    /*
     * Display component
     */
    return (
        <SnackbarContent className={classToUse} aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className="App-message-message">
                    <Icon className="App-message-icon App-messgae-icon-variant" />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
                    <CloseIcon className="App-message-icon" />
                </IconButton>,
            ]}
        />
    );
}

const MySnackbarContentWrapper = MySnackbarContent;

/*
 * Component to handle errorMessage component
 */
class CustomizedSnackbars extends React.Component {

    // Parameters for the component
    state = {
        // If the error must be displayed
        open: false,
        // Type of error
        type: 'error',
        // Message of error
        message: 'message',
        // Handle when closed
        handleClose: '',
    }

    /*
     * Set up parameters before displaying component
     */
    componentDidMount() {
        let info = this.props.attributes;
        this.setState({ open: info.open })
        this.setState({ type: info.type })
        this.setState({ message: info.message })
    }

    /*
     * Display component
     */
    render() {
        return (
            <div>
                <Snackbar anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                    open={this.props.attributes.open} autoHideDuration={3000} onClose={this.props.attributes.handleClose}>
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant={this.props.attributes.type}
                        message={this.props.attributes.message}
                    />
                </Snackbar>
            </div>
        );
    }
}

export default CustomizedSnackbars;
