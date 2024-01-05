import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import pimage from '../assets/profile.webp'

export default function Form() {
    const [profileImage, setProfileImage] = useState(pimage)

    const [formData, setFormData] = useState([])

    useEffect(() => {
        console.log('formData: ', formData);
    }, [formData])

    const initialValues = {
        name: '',
        email: '',
        phone: '',
        image: null,
        facebook: '',
        twitter: '',
        instagram: '',
    }

    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required('required'),
        email: Yup.string()
            .email('Invalid email')
            .required('required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Invalid phone number")
            .required("required"),
        image: Yup.mixed()
            .required("Image is required")
    })

    const formik = useFormik({
        initialValues,
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            console.log('values: ', values);
            resetForm()
            setProfileImage(pimage)
            setFormData([...formData, values])
        },
    });

    const handleImageChange = async (event) => {
        const selectedFile = event.target.files[0];
        formik.setFieldValue("image", selectedFile);
        setProfileImage(URL.createObjectURL(selectedFile));
    };

    const handleDelete = (index) => {
        const newData = formData.filter((data, i) => i !== index);
        setFormData(newData);
    };

    return (
        <>
            <form className='form p-3' onSubmit={formik.handleSubmit}>
                <div className="container">
                    <h5 className="text-center">Add Detail</h5>
                    <div className="row">
                        <div className="col-md-7">
                            <div>
                                <label htmlFor="name">Name: {formik.touched.name && formik.errors.name && <span className='text-danger'>{formik.errors.name}</span>}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className='form-control'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="email">Email: {formik.touched.email && formik.errors.email && <span className='text-danger'>{formik.errors.email}</span>}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className='form-control'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="phone">Phone: {formik.touched.phone && formik.errors.phone && <span className='text-danger'>{formik.errors.phone}</span>}
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className='form-control'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                    maxLength={10}
                                    onInput={(e) => { e.target.value = e.target.value.slice(0, 10).replace(/\D/g, ""); }}
                                />
                            </div>

                        </div>
                        <div className="col-md-5">
                            <div className="imgPrev" style={{ backgroundImage: `url(${profileImage})` }}>
                                <label htmlFor="image"></label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className='d-none'
                                    onChange={handleImageChange}
                                    onBlur={formik.handleBlur}
                                    accept='.jpg'
                                />
                            </div>
                            {formik.touched.image && formik.errors.image && <span className='text-danger'>{formik.errors.image}</span>}
                        </div>
                    </div>
                </div>
                <div className="container mt-4">
                    <h5 className="text-center">Social Links</h5>

                    <div class="input-group mb-4">
                        <span class="input-group-text">facebook</span>
                        <input
                            type="url"
                            name="facebook"
                            id="facebook"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.facebook}
                        />
                    </div>
                    <div class="input-group mb-4">
                        <span class="input-group-text">twitter</span>
                        <input
                            type="url"
                            name="instagram"
                            id="instagram"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.instagram}
                        />
                    </div>
                    <div class="input-group mb-4">
                        <span class="input-group-text">instagram</span>
                        <input
                           type="url"
                           name="twitter"
                           id="twitter"
                           className='form-control'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.twitter}
                        />
                    </div>
                </div>
                <div className='container mt-4'>
                    <button className='btn btn-primary' type="submit">Save</button>
                </div>
            </form>

            <div className="allData p-4">
                <div className="container">
                    <div className="row">
                        {
                            formData.map((data, index) =>
                                <div className="col-md-4 p-3 s_data" key={index}>
                                    <div className="border p-2">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <h4 className='mb-0'>Name:</h4> <span>{data.name}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <h4 className='mb-0'>Email:</h4> <span>{data.email}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <h4 className='mb-0'>Phone:</h4> <span>{data.phone}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 p-0">
                                                    <div className="image">
                                                        <img src={URL.createObjectURL(data.image)} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container my-4">
                                            <div className="d-flex gap-3">
                                                <a href={data.facebook} className='btn btn-primary btn-sm'>facebook</a >
                                                <a href={data.instagram} className='btn btn-primary btn-sm'>instagram</a>
                                                <a href={data.twitter
                                                } className='btn btn-primary btn-sm'>twitter</a>
                                            </div>
                                        </div>
                                        <div className="d-flex p-2 gap-3">
                                            <button className='btn btn-primary btn-sm' onClick={() => { handleDelete(index) }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
