// import lib
import isEmpty from '../../lib/isEmpty';

const validation = value => {
    let errors = {};
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;

    if (isEmpty(value.name)) {
        errors.name = "NAME_REQUIRED"
    }

    if (isEmpty(value.email)) {
        errors.email = "EMAIL_REQUIRED"
    } else if (!(emailRegex.test(value.email))) {
        errors.email = "INVALID_EMAIL"
    }

    if (isEmpty(value.subject)) {
        errors.subject = "SUBJECT_REQUIRED"
    }

    if (isEmpty(value.message)) {
        errors.message = "WRITE_A_MESSAGE"
    }

    return errors;
}

export default validation;