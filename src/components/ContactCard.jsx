import {deleteDoc, doc} from "firebase/firestore";
import React from "react";
import {HiOutlineUserCircle} from "react-icons/hi";
import {IoMdTrash} from "react-icons/io";
import {RiEditCircleLine} from "react-icons/ri";
import {db} from "../config/firebase";
import AddandUpdate from "./AddandUpdate";
import useDisclosure from "../assets/CustomHook/useDisclosure";
import { toast } from "react-toastify";

const ContactCard = ({contact}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();

  const Delete = async (id) => {
    try {
      await deleteDoc(doc(db, "Contact", id));
      toast.success("Contact Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        key={contact.id}
        className="flex items-center justify-between rounded-lg bg-yellow p-2 "
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-4xl text-orange" />
          <div>
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => Delete(contact.id)}
            className="text-orange cursor-pointer"
          />
        </div>
      </div>
      <AddandUpdate
        isUpdate
        contact={contact}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
