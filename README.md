# HarvestSun Frontend 🌾

Welcome to the frontend repository for **HarvestSun**, a smart agriculture platform designed to empower farmers and agricultural officers with data-driven insights, real-time monitoring, and intelligent disease detection.

## 🚀 Overview

HarvestSun aims to revolutionize agricultural management by providing an intuitive dashboard for farmers and analytical tools for agricultural officers (Dinas Pertanian). The frontend is built with modern web technologies to ensure a responsive, accessible, and fast user experience.

### Key Features
- **👩‍🌾 Farmer Dashboard**: Track farm health, manage daily activities, and log crop progress seamlessly.
- **👮 Officer Dashboard**: Monitor regional agricultural analytics, view real-time disease alerts, and send recommendations to farmers.
- **📊 Real-time Analytics & Charts**: Interactive visualization of farm health scores, crop production trends, and weather forecasts.
- **🦠 Disease Intelligence**: Track regional outbreaks with severity indicators and actionable insights.

## 💻 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Management & Validation**: React Hook Form + Zod
- **Data Visualization**: Recharts

## 🛠️ Getting Started

Follow these steps to run the frontend application locally:

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DanendraF/FE.HarvestSun-Remake.git
   cd FE.HarvestSun-Remake
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
   *(Ensure your backend is running on the corresponding URL)*

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- `/app`: Next.js App Router pages and layouts.
  - `/app/farmer`: Farmer portal (Dashboard, Farms, Crops, Activities).
  - `/app/officer`: Officer portal (Analytics, Monitoring, Disease Alerts).
- `/components`: Reusable UI components (shadcn UI, custom forms, charts).
- `/lib`: Utility functions, API services (`client.ts`, `farmService.ts`, etc.), and mock data.
- `/types`: Global TypeScript interfaces and type definitions.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
