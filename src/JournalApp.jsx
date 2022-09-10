import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const JournalApp = () => {
    return (
        <>
            <BrowserRouter>
                <AppTheme>
                    <AppRouter />
                </AppTheme>
            </BrowserRouter>
        </>
    )
}
