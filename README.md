# Ready Set Pack

## ✈️ About Ready Set Pack (Version 1)

Ready Set Pack is a full-stack travel companion app designed to simplify travel planning. It provides essential travel details such as visa requirements, currency conversion, and city information to help travelers prepare efficiently.

## 🌍 Hosted Version

- [Here](fe-readysetpack.vercel.app)

## 🌍 Features

- 📝 **Trip Information Page** – After filling out a form, you will be navigated to the trip information page. This page presents all essential travel details, including visa requirements, currency conversion, city information, landmarks, and events.
- ✅ **Travel Checklist** – On the trip information page, you can create a checklist to keep track of tasks before your trip. You can add or remove items to stay organized.
- 🧳 **Trip History** – View past and recent trips:
  - **Recent Trips** – Trips that are currently ongoing (end date has not passed yet).
  - **Past Trips** – Trips that have already ended (end date has passed).
- 🔒 **User Authentication** – Secure login and authentication powered by Supabase.
  - If you do not want to sign up with your email, you can use the dummy account:
    - **Email:** readysetpack@test.com
    - **Password:** readysetpack2025.

## 🛠 Tech Stack

- **Frontend:** Next.js (React, TypeScript)
- **Backend:** TypeScript, Supabase (Database & Authentication)
- **Backend API Hosted:** [Here](https://readysetpack.onrender.com/api)
- **Backend REPO:** [Here](https://github.com/Onuryilmaz24/be-readysetpack)
- **APIs:** External APIs for visa, currency, and city information
- **State Management:** Global state for user session handling

## 🚀 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Onuryilmaz24/fe-readysetpack.git
   cd fe-readysetpack
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:

   - Create a `.env.local` file in the root directory.
   - Add the following necessary keys:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     NEXT_PUBLIC_NINJA_API_KEY=your-ninja-api-key
     ```
   - Replace the placeholders with your actual API keys.

4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser.

## 📌 Roadmap

- [ ] Implement landmark information retrieval
- [ ] Improve UI/UX for trip management
- [ ] Add support for multi-language
- [ ] **Personalized User Profile** – Track how many trips a user has taken, display travel stats.
- [ ] **Progress Bar for Checklist** – Visualize completion status of travel checklists.
- [ ] **Editing Trips** – Allow users to edit trip details after creation.
- [ ] **Delete Canceled Trips** – Enable users to remove trips they no longer plan to take.
- [ ] **Past Trip Notes & Reviews** – Allow users to document experiences and reviews about past trips.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 📧 Contact

For questions or suggestions, reach out at [onurr.yilmaz24@gmail.com](mailto:onurr.yilmaz24@gmail.com).
