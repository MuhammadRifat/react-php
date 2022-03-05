import React, { useContext } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import RegistrationService from '../../services/RegistrationService'
import { userContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const [dataContainer, setDataContainer] = useContext(userContext);
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // get form data
    const handleFormData = (e) => {
        let eventName = e.target.name;
        if (eventName === 'name') {
            setUserData({ ...userData, name: e.target.value });
        } else if (eventName === 'phone') {

            setUserData({ ...userData, phone: e.target.value });
        } else if (eventName === 'address') {
            setUserData({ ...userData, address: e.target.value });
        } else if (eventName === 'password') {
            setUserData({ ...userData, password: e.target.value });
        } else if (eventName === 'confirmPassword') {
            setUserData({ ...userData, confirmPassword: e.target.value });
        }
    }

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            // code here
            setMessage("Password do not match!");
        } else if (userData.password.length < 8) {
            setMessage("Password must be at least 8 characters");
        } else if (userData.phone.length < 11) {
            setMessage("Phone number must be at least 11 digits");
        } else {
            RegistrationService.userRegistration(userData)
                .then(response => {
                    if (response.status) {
                        setDataContainer({ ...dataContainer, token: response.token });
                        localStorage.setItem("token", response.token);
                        navigate('/dashboard');
                    } else {
                        setMessage(response.error);
                    }
                })
                .catch(err => {
                    setMessage(err.message);
                })
        }
    }

    return (
        <div className="bg-light d-flex flex-row align-items-center" style={{ minHeight: '80vh' }}>
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <span className="text-danger">{message}</span>
                                <CForm>
                                    <h1>Registration</h1>
                                    <p className="text-medium-emphasis">Create your account</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput placeholder="Name" autoComplete="name" name="name" id="name" value={userData.name} onChange={handleFormData} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput placeholder="Phone number" autoComplete="phone" name="phone" id="phone" value={userData.phone} onChange={handleFormData} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput placeholder="Address" autoComplete="address" name="address" id="address" value={userData.address} onChange={handleFormData} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            name="password" id="password" value={userData.password} onChange={handleFormData}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Repeat password"
                                            autoComplete="new-password"
                                            name="confirmPassword" id="confirmPassword" value={userData.confirmPassword} onChange={handleFormData}
                                        />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="success" onClick={handleSubmit}>Create Account</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Registration
