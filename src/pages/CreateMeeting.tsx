import React from 'react'

export default function CreateMeeting() {
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form>
        <div className="form-group mb-6">
          <label
            htmlFor="meetingID"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Meeting ID
          </label>
          <input
            type="email"
            className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="meetingID"
            aria-describedby="emailHelp"
            placeholder="Enter a Meeting ID"
          />
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="name"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="name"
            placeholder="Enter your Attendee Name"
          />
        </div>

        <button
          type="submit"
          className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
