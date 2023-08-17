"use client";

import { CarProps } from "@/types";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { generateCarImageUrl } from "@/utils";
interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

// Loading fallback component while the image is being fetched
const LoadingIndicator = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin"></div>
  </div>
);

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const [isImage1Loaded, setIsImage1Loaded] = useState(false);
  const [isImage2Loaded, setIsImage2Loaded] = useState(false);
  const [isImage3Loaded, setIsImage3Loaded] = useState(false);

  const handleImage1Load = () => {
    setIsImage1Loaded(true);
  };
  const handleImage2Load = () => {
    setIsImage2Loaded(true);
  };
  const handleImage3Load = () => {
    setIsImage3Loaded(true);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute z-10 p-2 rounded-full top-2 right-2 w-fit bg-primary-blue-100"
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex flex-col flex-1 gap-3">
                    <div className="relative w-full h-40 bg-center bg-cover rounded-lg bg-pattern">
                      <Image
                        src={generateCarImageUrl(car)}
                        alt="car model"
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="relative flex-1 w-full h-24 rounded-lg bg-primary-blue-100">
                        {!isImage1Loaded && <LoadingIndicator />}
                        <img
                          src={generateCarImageUrl(car, "29")}
                          alt="car model"
                          className={`object-fit ${
                            isImage1Loaded ? "" : "hidden"
                          }`}
                          onLoad={() => handleImage1Load()}
                        />
                      </div>
                      <div className="relative flex-1 w-full h-24 rounded-lg bg-primary-blue-100">
                        {!isImage2Loaded && <LoadingIndicator />}
                        <img
                          src={generateCarImageUrl(car, "22")}
                          alt="car model"
                          className={`object-fit ${
                            isImage2Loaded ? "" : "hidden"
                          }`}
                          onLoad={() => handleImage2Load()}
                        />
                      </div>
                      <div className="relative flex-1 w-full h-24 rounded-lg bg-primary-blue-100">
                        {!isImage3Loaded && <LoadingIndicator />}
                        <img
                          src={generateCarImageUrl(car, "13")}
                          alt="car model"
                          className={`object-fit ${
                            isImage3Loaded ? "" : "hidden"
                          }`}
                          onLoad={() => handleImage3Load()}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 gap-2">
                    <h2 className="text-xl font-semibold capitalize">
                      {car.make} {car.model}
                    </h2>
                    <div className="flex flex-wrap gap-4 mt-3">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex justify-between w-full gap-5 text-right"
                          key={key}
                        >
                          <h4 className="capitalize text-grey">
                            {key.split("_").join(" ")}
                          </h4>
                          <p className="font-semibold text-black-100">
                            {typeof value === "string"
                              ? value.charAt(0).toUpperCase() + value.slice(1)
                              : value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
