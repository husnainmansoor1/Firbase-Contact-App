import React from "react";
import Model from "./Model";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";


const AddandUpdateSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
});
const AddandUpdate = ({isOpen, onClose, contact, isUpdate}) => {
  const AddContact = async (contact) => {
    try {
      const ContactRef = collection(db, "Contact");
      await addDoc(ContactRef, contact);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateContact = async (contact, id) => {
    try {
      const ContactRef = doc(db, "Contact", id);
      await updateDoc(ContactRef, contact);
      onClose();
      toast.success("Contact updated successfully")
      } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={AddandUpdateSchema}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            // console.log(values);
            isUpdate? UpdateContact(values, contact.id) : AddContact(values);
            onClose();
            
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" className="h-10 border" />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="h-10 border" />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="email"/>
              </div>
            </div>
            <button className="border px-3 py-1.5 bg-orange text-white hover:bg-sky-800">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Model>
    </div>
  );
};

export default AddandUpdate;
