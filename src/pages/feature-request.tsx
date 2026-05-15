import { useState } from "react";
import { ChevronDown } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { cx } from "@/utils/cx";

const REASON_OPTIONS = ["Feature Request", "Bug Report", "General Feedback"] as const;

const MESSAGE_PLACEHOLDER: Record<string, string> = {
    "Bug Report":        "Tell us about this bug",
    "Feature Request":   "Tell us about this new feature",
    "General Feedback":  "Tell us about what's on your mind",
};

export function FeatureRequest() {
    const [reason, setReason] = useState("");
    const [reasonOpen, setReasonOpen] = useState(false);
    const [anonymous, setAnonymous] = useState(false);
    const [sent, setSent] = useState(false);

    if (sent) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-primary px-8 py-16">
                <div className="flex max-w-[480px] flex-col gap-4 text-center">
                    <h1 className="text-display-md font-semibold tracking-tight text-primary">Thanks for reaching out!</h1>
                    <p className="text-xl text-tertiary">We'll review your message and get back to you soon.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-primary px-8 py-16">
            <div className="flex items-start gap-8 lg:gap-16">
                {/* Left — form */}
                <div className="flex w-[480px] flex-col gap-12">
                    <div className="flex flex-col gap-5">
                        <h1 className="text-display-md font-semibold tracking-tight text-primary">
                            Something not right?
                        </h1>
                        <p className="text-xl text-tertiary">
                            We appreciate every single insight we get from our users. That's you!
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                            {/* Reason dropdown */}
                            <div className="relative flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-secondary">
                                    What is the reason you're contacting the Product Team?
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setReasonOpen((o) => !o)}
                                    className="flex w-full items-center justify-between rounded-md border border-primary bg-primary px-3 py-2 shadow-xs focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand"
                                >
                                    <span className={cx("text-sm", reason ? "text-primary" : "text-placeholder")}>
                                        {reason || "Select one"}
                                    </span>
                                    <ChevronDown className={cx("size-4 text-fg-quaternary transition-transform duration-150", reasonOpen && "rotate-180")} />
                                </button>
                                {reasonOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setReasonOpen(false)} />
                                        <div className="absolute top-full left-0 z-20 mt-1 w-full overflow-hidden rounded-md border border-secondary bg-primary shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
                                            <div className="py-1">
                                                {REASON_OPTIONS.map((opt) => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => { setReason(opt); setReasonOpen(false); }}
                                                        className={cx(
                                                            "mx-1.5 flex w-[calc(100%-12px)] items-center rounded-md px-2.5 py-2 text-left text-sm font-semibold transition-colors",
                                                            reason === opt ? "bg-secondary_subtle text-primary" : "text-secondary hover:bg-secondary_subtle",
                                                        )}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Portal link */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-secondary">
                                    What part of the Portal are we talking about?
                                </label>
                                <div className="rounded-lg border border-secondary bg-primary px-3.5 py-2.5 shadow-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand">
                                    <input
                                        type="text"
                                        placeholder="Paste the link"
                                        className="w-full bg-transparent text-sm text-primary placeholder:text-placeholder outline-none"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-secondary">Message</label>
                                <div className="rounded-lg border border-secondary bg-primary px-3.5 py-3 shadow-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand">
                                    <textarea
                                        rows={5}
                                        placeholder={MESSAGE_PLACEHOLDER[reason] ?? "Tell us about your message"}
                                        className="w-full resize-y bg-transparent text-sm text-primary placeholder:text-placeholder outline-none"
                                    />
                                </div>
                            </div>

                            {/* Anonymous checkbox */}
                            <Checkbox
                                size="md"
                                isSelected={anonymous}
                                onChange={setAnonymous}
                                label="I want to remain anonymous"
                            />
                        </div>

                        {/* Submit */}
                        <Button color="primary" size="lg" onClick={() => setSent(true)}>
                            Send message
                        </Button>
                    </div>
                </div>

                {/* Right — illustration */}
                <div className="hidden lg:block" style={{ width: 560, height: 680 }}>
                    <img
                        src="/featurerequest_illustration.jpg"
                        alt=""
                        className="h-full w-full rounded-2xl object-cover shadow-xl"
                    />
                </div>
            </div>
        </div>
    );
}
