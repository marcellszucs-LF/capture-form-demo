import { useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-primary px-8 py-16">
            <div className="flex items-center gap-8 lg:gap-16">
                {/* Left — text */}
                <div className="flex max-w-[480px] flex-col gap-12">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-3">
                            <span className="text-md font-semibold text-brand-secondary">404 error</span>
                            <h1 className="text-display-xl font-semibold tracking-tight text-primary">
                                We didn't find a way.
                            </h1>
                        </div>
                        <p className="text-xl text-tertiary">
                            Sorry, the page you are looking for doesn't exist or moved.
                        </p>
                    </div>
                    <Button color="primary" size="lg" className="w-fit" onClick={() => navigate("/portal")}>
                        Go back home
                    </Button>
                </div>

                {/* Right — video */}
                <div className="hidden lg:block" style={{ width: 560, height: 600 }}>
<img src="/logo-photo-tour-800x800.gif" alt="" className="h-full w-full rounded-2xl object-cover shadow-xl" />
                </div>
            </div>
        </div>
    );
}
