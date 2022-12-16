const setAppointmentTemplate = (name, date, time, service_type) => {
    return `<h3>${service_type}</h3>\n<p>Hello ${name},</p>\n\n<span>Date: ${date}</span>\n<span>Time: ${time}</span>\n\nBe sure to attend.`
}

const approveAppointmentTemplate = (name, service_type) => {
    return `<h3>${service_type}</h3>\n<p>Hello ${name},</p>\n<span>This is to inform you that your appointment has been approve. Kindly check your appointment status in the system.</span>`
}

module.exports ={
    setAppointmentTemplate,
    approveAppointmentTemplate
}