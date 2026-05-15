import { ArrowRight } from "@untitledui/icons";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/base/buttons/button";

export function NoAccess() {
    const navigate = useNavigate();
    const [supportHovered, setSupportHovered] = useState(false);

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-primary px-8 py-16">
            <div className="flex items-center gap-8 lg:gap-16">
                {/* Left — text */}
                <div className="flex max-w-[480px] flex-col gap-12">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-3">
                            <span className="text-md font-semibold text-brand-secondary">403 error</span>
                            <h1 className="text-display-xl font-semibold tracking-tight text-primary">
                                Unauthorised
                            </h1>
                        </div>
                        <p className="text-xl text-tertiary">
                            It seems you don't have permission to see this page
                        </p>
                    </div>
                    <div className="flex flex-col gap-10">
                        <Button color="primary" size="lg" className="w-fit" onClick={() => navigate("/portal")}>
                            Go back home
                        </Button>
                        <div className="flex flex-col gap-1">
                            <a
                                href="mailto:support@lovefinance.co.uk"
                                className="flex w-fit items-center gap-1.5 text-md font-semibold text-brand-secondary transition-opacity hover:opacity-80"
                                onMouseEnter={() => setSupportHovered(true)}
                                onMouseLeave={() => setSupportHovered(false)}
                            >
                                Contact support
                                <span
                                    className="inline-flex"
                                    style={{ transform: supportHovered ? "translateX(4px)" : "translateX(0)", transition: "transform 150ms ease-in-out" }}
                                >
                                    <ArrowRight className="size-5" />
                                </span>
                            </a>
                            <p className="text-md text-tertiary">
                                If you think you should be able to see this page, please state your case by
                                describing why you need access and we'll get back to you
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right — video */}
                <div className="hidden lg:block" style={{ width: 560, height: 600 }}>
<img src="/logo-photo-tour-800x800.gif" alt="" className="h-full w-full rounded-2xl object-cover shadow-xl" />
                </div>
            </div>
        </div>
    );
}
