import { ArrowRight } from "@untitledui/icons";
import { useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";

export const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-tertiary p-4">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6 rounded-xl bg-primary_alt p-6 shadow-lg border border-secondary">
                    <div className="flex justify-center">
                        <img src="/lovey-logo-purple.svg" alt="Lovey" className="h-10 w-auto" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-semibold text-primary text-center">Where would you like to go?</h1>
                        <p className="text-sm text-tertiary text-center">Choose a prototype</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            color="primary"
                            size="lg"
                            iconTrailing={ArrowRight}
                            className="w-full"
                            onClick={() => navigate("/form")}
                        >
                            Customer Capture Form
                        </Button>
                        <Button
                            color="primary"
                            size="lg"
                            iconTrailing={ArrowRight}
                            className="w-full"
                            onClick={() => navigate("/uw-portal")}
                        >
                            Underwriter Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
