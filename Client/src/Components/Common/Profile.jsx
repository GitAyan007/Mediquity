import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import User from '../../Asset/Profile/User.jpg'
import { toast } from 'react-toastify';

const Profile = () => {
  const [Appointments, setappointments] = useState([]);
  const token = sessionStorage.getItem("token");
  const [userdetails, setuserdetails] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setuserdetails(response);

      } catch (e) {
        console.log(e.message);
      }
    }
    getuserdetails();
  }, [token])

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/getAppointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setappointments(response);

      } catch (e) {
        console.error(e);
      }
    }
    getAppointments();
  }, [token])

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    try {
      toast.loading();
      await axios.delete(`${BASE_URL}/api/v1/user/cancelAppointment`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        data: {
          appointmentId: selectedAppointment._id
        }
      });
      toast.dismiss();
      toast.success("Appointment Cancelled Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Please Try Again");
      console.error("Error fetching slots:", error);
    }
    setShowModal(false);
  };

  return (
    <div className='min-h-[100vh] min-w-[100vw] dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] overflow-clip'>
      <div className="flex flex-col">
        <div className='flex xl:flex-row flex-col gap-y-10 mt-[8%] lg:justify-center lg:gap-x-20 items-center'>
          <div>
            <img src={User} className='rounded-full lg:h-[400px] h-[350px] lg:w-[400px] w-[350px]' alt='Doctor' />
          </div>

          <div className='xl:w-[2px] w-[70%] xl:h-[400px] h-[5px] bg-white rounded-md' />
          <div className='flex items-center'>
            <div className='flex flex-col gap-y-5 lg:justify-center items-center'>

              <div className='flex lg:flex-row flex-col gap-x-5 lg:items-baseline gap-y-3'>
                <div className='text-gray-300 text-5xl uppercase text-center first-letter:text-6xl'>Name <span className='lg:inline-block hidden'>-</span> </div>
                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center'>{userdetails?.data?.user?.name} </div>
              </div>

              <div className='flex lg:flex-row flex-col gap-x-5 lg:items-baseline gap-y-3'>
                <div className='text-gray-300 text-5xl uppercase text-center first-letter:text-6xl'>Email <span className='lg:inline-block hidden'>-</span> </div>
                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold select-none tracking-[1px] text-center'>{userdetails?.data?.user?.email}</div>
              </div>

            </div>
          </div>
        </div>

        <div className='xl:w-0 w-[70%] xl:h-[400px] h-[5px] bg-white rounded-md mx-auto mt-[5%]' />

        <div className="flex flex-col w-full xl:-mt-[27%]">
          <div className='select-none text-gray-300 lg:text-5xl text-4xl uppercase first-letter:text-6xl tracking-[2px] mx-auto mt-[4%]'>
            Your
          </div>
          <div className='select-none text-gray-300 lg:text-5xl text-4xl uppercase first-letter:text-6xl tracking-[2px] mx-auto mt-[1%]'>
            Appointment
          </div>
          <div className='grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-x-12 w-full lg:p-20 p-10 gap-y-4'>
            {Appointments?.data?.appointments?.map((appointment, index) => (
              <div key={index} className={` h-fit w-full flex flex-col gap-y-4 border border-white rounded-[15px] bg-black p-4`}>
                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold select-none tracking-[1px] text-center underline decoration-slate-500 underline-offset-4'>{index + 1}</div>
                {/* NAME */}
                <div className='flex gap-x-4 justify-center lg:items-baseline lg:flex-row flex-col'>
                  <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center first-letter:text-3xl lg:no-underline underline decoration-slate-500 underline-offset-4'>Doctor <span className='lg:inline hidden'>-</span> </div>
                  <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-md lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center lg:first-letter:text-3xl first-letter:text-xl lg:mt-0 mt-[1%]'>{appointment?.doctorId?.name}</div>
                </div>
                {/* EMAIL */}
                <div className='flex gap-x-4 justify-center lg:items-baseline lg:flex-row flex-col'>
                  <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center first-letter:text-3xl lg:no-underline underline decoration-slate-500 underline-offset-4'>Email <span className='lg:inline hidden'>-</span> </div>
                  <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-md lg:text-2xl font-bold select-none tracking-[1px] text-center lg:mt-0 mt-[1%]'>{appointment?.doctorId?.email}</div>
                </div>
                {/* DAY */}
                <div className='flex gap-x-4 justify-center lg:items-baseline lg:flex-row flex-col'>
                  <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center first-letter:text-3xl lg:no-underline underline decoration-slate-500 underline-offset-4'>Date <span className='lg:inline hidden'>-</span> </div>
                  <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-md lg:text-2xl font-bold select-none tracking-[1px] text-center lg:mt-0 mt-[1%]'>{appointment?.slotId?.day}</div>
                </div>
                {/* TIME */}
                <div className='flex gap-x-4 justify-center lg:items-baseline lg:flex-row flex-col'>
                  <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center first-letter:text-3xl lg:no-underline underline decoration-slate-500 underline-offset-4'>Time <span className='lg:inline hidden'>-</span> </div>
                  <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-md lg:text-2xl font-bold select-none tracking-[1px] text-center lg:mt-0 mt-[1%]'>{appointment?.slotId?.time}</div>
                </div>
                <div className="flex w-full justify-center gap-x-2">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-b from-neutral-200 to-neutral-600 rounded-lg py-2 px-4 mt-4 uppercase tracking-[2px]"
                    onClick={() => window.open(`${appointment.link}`, '_blank')}
                  >
                    Join
                  </button>
                  <button
                    type="submit"
                    className={`text-white bg-gradient-to-b from-neutral-200 to-neutral-600 rounded-lg py-2 px-4 mt-4 uppercase tracking-[2px] ${appointment.canCancel ? '' : 'opacity-60'}`}
                    onClick={!appointment.canCancel ? () => toast.error("Sorry! You can't cancel now") : () => handleAppointmentClick(appointment)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
          {
            Appointments?.data?.appointments?.length <= 0 &&
            <div className='text-gray-500 uppercase text-md tracking-[1.2px] flex justify-center -mt-[6%] items-baseline select-none'>
              <span className='text-xl'>N</span>o <span className='text-xl lg:ml-[0.5%] ml-[1.5%]'>A</span>ppointment <span className='text-xl lg:ml-[0.5%] ml-[1.5%]'>F</span>ound
            </div>
          }
        </div>
      </div>
      <div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
            <div className="relative bg-white p-8 rounded-md shadow-md">
              <h2 className="text-2xl mb-4 uppercase tracking-[1.5px]">Confirm Cancel</h2>
              <p className='uppercase tracking-[1.2px]'>Are you sure you want to cancel the appointment for {selectedAppointment.day} at {selectedAppointment.time}?</p>
              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md mr-4 uppercase tracking-[1.2px]" onClick={handleConfirmCancel}>Yes</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md uppercase tracking-[1.2px]" onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile;