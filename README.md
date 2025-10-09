# 🦷 CureMyTeeth - Dental Appointment Booking & AI Chatbot Platform

**Live Demo**: 🌐 [https://curemyteeth.com](https://curemyteeth.com)

CureMyTeeth is a modern, AI-powered dental appointment booking application built using **Next.js**, **Tailwind CSS**, and **Genkit AI Flows**. Designed for **Dr. Sidharth Malhotra** in **Mandi, Himachal Pradesh**, the platform helps patients easily book appointments and get instant dental advice via an integrated AI chatbot.

---

## 📸 Preview

![App Preview](./screenshot.png) *(Add your actual app screenshot here)*

---

## 🚀 Features

- 🗓️ **Online Appointment Booking** — Simple and intuitive form to book appointments with Dr. Sidharth Malhotra.
- 🤖 **AI-Powered Dental Chatbot** — Built with Genkit AI Flows to offer dental care Q&A.
- 📱 **Responsive UI** — Tailwind CSS ensures beautiful styling across devices.
- ⚡ **Fast & Scalable** — Built using modern web technologies (Next.js, React).
- 🧠 **Contextual AI Support** — Chatbot understands dental terminology and offers real-time guidance.

---

## 🧰 Tech Stack 

| Tech        | Description                          |
|-------------|--------------------------------------|
| Next.js     | React-based web framework            |
| Tailwind CSS| Utility-first CSS for styling        |
| Genkit AI   | AI flow orchestration and chat logic |
| React       | UI rendering                         |
| Vercel      | Hosting & Deployment                 |

--- additionally help from firebase studio for increasing efficiency

## 🏥 About the Dentist

**Dr. Sidharth Malhotra** is a trusted dental practitioner based in **Mandi, Himachal Pradesh**, providing high-quality oral health services to the local community. CureMyTeeth aims to streamline appointment scheduling and increase accessibility through digital means.

---

About the Appointment thing:
In-Memory "Database": All appointment data is stored in a simple JavaScript array that lives on the server. You can see this setup in the file src/lib/actions.ts. An array named appointments_db is initialized on the globalThis object. Using globalThis is a development trick to help the data persist between hot reloads, but it's not permanent storage; if the server fully restarts, the data is wiped.

Booking an Appointment:

When a patient fills out the Appointment Form and clicks "Request Appointment", it calls the bookAppointment function in src/lib/actions.ts.
This function creates a new appointment object, assigns it a unique ID, and adds it to the appointments_db array.
Viewing Appointments:

Doctor's Dashboard: The AppointmentRequestsTable component calls getAppointments(), which simply reads all the appointments from the in-memory appointments_db array and displays them.
Patient's Portal: The PatientAppointmentsList calls getAppointmentsByEmail(email), which filters the appointments_db array to find only the appointments matching the logged-in patient's email.
Updating Status: When the doctor approves or cancels an appointment, the updateAppointmentStatus function finds that appointment in the array by its ID and changes its status property.

In short, the entire appointment system is currently running on a temporary, server-side list. This is great for quick prototyping, but as we discussed, it doesn't support real-time updates and the data is not permanently saved. The next logical step would be to replace this in-memory system with a real database like Firebase Firestore.
## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/curemyteeth.git
cd curemyteeth
npm install
