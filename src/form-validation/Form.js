import { useEffect, useState } from 'react';
import './Form.css';

function Form() {

    const initialValues = { associatename: "", associateid: "", projectid: "", comments: "" };
    const initialOption = (<option>choose location</option>);
    const offShoreValues = [
        { name: "choose location"},
        { name: "chennai" },
        { name: "Bangalore" },
        { name: "Hyderabad" },
        { name: "Pune" },
        { name: "Kochi" }
    ];
    const onShoreValues = [
        { name: "choose location"},
        { name: "US" },
        { name: "Non US" }
    ];
    const errors = {};
    const specialChars = /^[a-zA-Z\s]+$/;
    const reg = new RegExp('^[0-9]+$');

    var form = document.forms['main'];
    const [formValues, setFormValues] = useState(initialValues);

    const [associateNameisValid, setassociateNameisValid] = useState(false);
    const [associateIdisValid, setassociateIdisValid] = useState(false);
    const [projectIdisValid, setprojectIdisValid] = useState(false);
    const [locationisValid, setlocationisValid] = useState(false);
    const [fileisValid, setfileisValid] = useState(false);
    const [commentisValid, setcommentisValid] = useState(false);
    const [skillisValid , setSkillsValid] = useState(false);

    const [formErrors, setFormErrors] = useState({});
    const [allFormErrors, setAllErrors] = useState({});
    const [inititalState, setInitialState] = useState(true);
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
    const [onShoreChecked, setOnShoreChecked] = useState(false);
    const [offShoreChecked, setOffShoreChecked] = useState(false);
    const [locationOptions, setLocationOptions] = useState(initialOption);

    const handleAssociateName = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        const associateNameLength = formValues.associatename.length + 1;
        if (!(associateNameLength)) {
            errors.associatename = "Please enter the Associate Name";
            setassociateNameisValid(false);
        } else if (associateNameLength < 5 || associateNameLength > 30 || !formValues.associatename.match(specialChars)) {
            errors.associatename = "Accepts Alphabets, space & Min 5 to Max 30 Char";
            setassociateNameisValid(false);
        }else{
            setassociateNameisValid(true);
        }
        setInitialState(false);
        setFormErrors(errors);
    };

    const handleAssociateId = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        const associateIdlength = formValues.associateid.length + 1;
        if (!(associateIdlength)) {
            errors.associateid = "Please enter the Associate id";
            setassociateIdisValid(false);
        }else if (associateIdlength < 6 || associateIdlength > 6 || !reg.test(formValues.associateid)) {
            errors.associateid = "Invalid Associate id";
            setassociateIdisValid(false);
        }else{
            setassociateIdisValid(true);
        }
        setInitialState(false);
        setFormErrors(errors);
    };

    const handleProjectId = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        const projectIdlength = formValues.projectid.length + 1;
        if (!(projectIdlength)) {
            errors.projectid = "Please enter the Project id";
            setprojectIdisValid(false);
        }else if (projectIdlength < 12 || projectIdlength > 12 || !formValues.projectid.match(specialChars)) {
            errors.projectid = "Invalid Project id";
            setprojectIdisValid(false);
        }else{
            setprojectIdisValid(true);
        }
        setInitialState(false);
        setFormErrors(errors);
    };

    const handleLocation = (e) => {
        if(e.target.value == "choose location"){
            errors.location = "Please select the location";
            setprojectIdisValid(false);
        }else{
            setlocationisValid(true);
        }
        setFormErrors(errors);
    }

    const handleComments = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        const commentLength = formValues.comments.length + 1;
        if (!(commentLength)) {
            errors.comments = "Please enter comments";
            setcommentisValid(false);
        }else{
            setcommentisValid(true);
        }
        setInitialState(false);
        setFormErrors(errors);
    };

    const handleOnshore = () => {
        const onShoreLocations = onShoreValues.map((i) => <option>{i.name}</option>);
        errors.location = "Please select the location";
        setFormErrors(errors);
        setLocationOptions(onShoreLocations);
        setOnShoreChecked(true);
        setOffShoreChecked(false);
        setInitialState(false);
    };

    const handleOffshore = () => {
        const offShoreLocations = offShoreValues.map((i) => <option>{i.name}</option>);
        errors.location = "Please select the location";
        setFormErrors(errors);
        setLocationOptions(offShoreLocations);
        setOffShoreChecked(true);
        setOnShoreChecked(false);
        setInitialState(false);
    };

    const handleFile = (e) => {
        const files = e.target.files;
        if (!files.length) {
            errors.file = "Please Upload Profile";
            setfileisValid(false);
        }else{
            setfileisValid(true);
        }
        setFormErrors(errors);
        setInitialState(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleReset = (e) => {

        var checkbox = form.querySelectorAll('input[type="checkbox"]:checked');
        checkbox.forEach(check => {
            check.checked = false;
        })

        e.preventDefault();
        setFormValues(initialValues);
        setLocationOptions(initialOption);
        setSubmitDisabled(true);
        setOnShoreChecked(false);
        setOffShoreChecked(false);
        setFormErrors({});
        setInitialState(true);
        setassociateNameisValid(false);
        setassociateIdisValid(false);
        setlocationisValid(false);
        setSkillsValid(false);
        setfileisValid(false);
        setcommentisValid(false);
    };

    useEffect(() => {
        console.log(formErrors);
    }, [formErrors]);

    const countChecked = () => {
        var checkbox = form.querySelectorAll('input[type="checkbox"]:checked');
        if (checkbox.length < 5) {
            errors.skills = "Please select Min 5 skills";
        }else{
            setSkillsValid(true);
        }
        setInitialState(false);
        setFormErrors(errors);
    };

    const checkValidation = () => {
        if (associateNameisValid && associateIdisValid && projectIdisValid && locationisValid && skillisValid && fileisValid && commentisValid && !inititalState) {
            setSubmitDisabled(false);
        }else{
            setSubmitDisabled(true);
        }
    }

    return (
        <>
            <h3 className='text-center'> Form Validation <span className="red-color">*</span></h3>
            <div className="form-div">
                <form name="main" onChange={checkValidation}>
                    <div className="form-group">
                        <input type="text" value={formValues.associatename} onChangeCapture={handleAssociateName} id="fname" name="associatename" placeholder="Associate Name" className="form-control" />
                        <p className="red-color">{formErrors.associatename}</p>
                    </div>
                    <div className="form-group">
                        <input type="text" value={formValues.associateid} onChange={handleAssociateId} id="lname" name="associateid" placeholder="Associate ID" className="form-control" />
                        <p className="red-color">{formErrors.associateid}</p>
                    </div>
                    <div className="form-group">
                        <input type="text" value={formValues.projectid} onChange={handleProjectId} id="lname" name="projectid" placeholder="Project ID" className="form-control" />
                        <p className="red-color">{formErrors.projectid}</p>
                    </div>
                    <div className="form-row">
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" onClick={handleOnshore} name="Onshore" id="Onshore" checked={onShoreChecked}
                                    value="option1" />
                                <label className="form-check-label">
                                    Onshore
                                </label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" onClick={handleOffshore} name="Offshore" id="Offshore" checked={offShoreChecked}
                                    value="option1" />
                                <label className="form-check-label">
                                    Offshore
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <select className="form-control" id="locations" onChange={handleLocation}>
                            {locationOptions} 
                        </select>
                        <p className="red-color">{formErrors.location}</p>
                    </div>
                    <div className="form-row">
                        <div className="col-md-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={countChecked} value="" id="defaultCheck1" name='html' />
                                <label className="form-check-label">
                                    HTML, CSS3, JS
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={countChecked} value="" id="defaultCheck1" name='angular' />
                                <label className="form-check-label">
                                    Angular 8
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={countChecked} value="" id="defaultCheck1" name='express' />
                                <label className="form-check-label">
                                    Express JS
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={countChecked} value="" id="defaultCheck1" name='sass' />
                                <label className="form-check-label">
                                    SASS
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={countChecked} value="" id="defaultCheck1" name='react' />
                                <label className="form-check-label">
                                    React JS
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={countChecked} value="" id="defaultCheck1" name='node' />
                                <label className="form-check-label">
                                    Node JS
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={countChecked} value="" id="defaultCheck1" name='es6' />
                                <label className="form-check-label">
                                    ES5,ES6.ES7..
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={countChecked} value="" id="defaultCheck1" name='vue' />
                                <label className="form-check-label">
                                    Vue JS
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={countChecked} value="" id="defaultCheck1" name='mongo' />
                                <label className="form-check-label">
                                    Mongo DB
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={countChecked} value="" id="defaultCheck1" name='bootstrap' />
                                <label className="form-check-label">
                                    Bootstrap 4
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onClick={countChecked} value="" id="defaultCheck1" name='typescript' />
                                <label className="form-check-label">
                                    TypeScript
                                </label>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <p className="red-color">{formErrors.skills}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <p>Upload Profile</p>
                        <input type="file" className="form-control-file" id="uploadProfile" onChange={handleFile} onClick={handleFile} className="form-control" />
                        <span id="custom-text">No file chosen</span>
                        <p className="red-color">{formErrors.file}</p>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" value={formValues.comments} onChange={handleComments} name="comments" id="exampleFormControlTextarea1" rows="4"></textarea>
                        <p className="red-color">{formErrors.comments}</p>
                    </div>
                    <div className="btn-group mr-2" role="group" aria-label="First group">
                        <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</button>
                    </div>
                    <div className="btn-group mr-2" role="group" aria-label="First group">
                        <button className="btn btn-danger" onClick={handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Form;