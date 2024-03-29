import { useRef, useState } from "react";

export function EmailSignUp() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const formRef = useRef(document.createElement('form'));
    const formLocation = "https://app.convertkit.com/forms/5263249/subscriptions";

    if (submitting)
        return (
            <div className="email-signup text-center p-3">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )

    if (!submitted)
        return (
            <div className="email-signup">
                <div className="text-center">
                    <h4>Want to get notified about future posts? Fill out the form below to sign up.</h4>
                    <form ref={formRef}>
                        <div className="m-3 row">
                            <div className="col">
                                <div className="form-floating">
                                    <input type="email" name="email_address" className="form-control" id="email" placeholder="name@example.com" required={true} />
                                    <label className="form-label" htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="col-md-auto pt-md-0 pt-2 d-flex">
                                <button className="btn btn-success align-self-center"
                                    onClick={() => {
                                        const form = formRef.current;
                                        if (!form.checkValidity()) return;

                                        const formData = new FormData(form);
                                        setSubmitting(true);
                                        fetch(formLocation, {
                                            method: "POST",
                                            body: formData,
                                            headers: {
                                                "Accept": "application/json",
                                            },
                                        }).then(response => {
                                            console.log(response);
                                            setSubmitting(false);
                                            setSubmitted(true);
                                        }).catch(error => console.log(error))

                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );

    return (
        <div className="email-signup">
            <h4>Success! Now check your email's inbox to confirm your subscription.</h4>
        </div>
    )
}