import React, { useState } from 'react';
import './customModal.css';
//icons
import { FaWindowClose } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

export default function CustomModal(props) {

  const { darkMode, isOpen, onCancel, title, onOk, width, height } = props;

  return (
    <>
      <AnimatePresence >{isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.21 }, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{ backdropFilter: 'blur(10px)' }}
          className={`
            ${darkMode ? ' bg-[#23252b] text-[#919197]' : '  text-[#18191a] bg-[#fcf6eb]'} 
            justify-between fixed items-center z-[900]   absolute  p-6 h-[400px] top-[10%] flex w-[520px] flex-col rounded-xl `}>
          <div className="w-full flex justify-end "><button onClick={onCancel} className="text-[#924a4a] hover:text-[#a35a5a]" ><FaWindowClose size={24} /></button></div>

          <p className="text-lg mb-2 font-semibold">{title}</p>
          {props.children}
          <div className="flex justify-end py-3 w-full">
            <button className="bg-none rounded-md border-2 border-[#924a4a] py-1 mr-4 w-20 px-3 text-sm text-[#a35a5a] hover:border-[#7c3d3d] text-[#924a4a]" onClick={onCancel}>
              Annuler
            </button> <button className="bg-[#924a4a] hover:bg-[#7c3d3d] rounded-md py-1  w-20  text-sm px-3 text-white" onClick={onOk}>
              Ok
            </button></div>

        </motion.div>
      ) : ''} </AnimatePresence>
    </>
  );
}