import AppRoutes from "@/routes/AppRoutes"
import { Toaster } from "@/components/ui/sonner"

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-center" closeButton richColors />
    </>
  )
}

export default App