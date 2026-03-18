import { cx } from "@/utils/cx";

interface SkeletonProps {
    className?: string;
    /** Width of the skeleton. Can be a Tailwind class like "w-32" or a CSS value */
    width?: string;
    /** Height of the skeleton. Can be a Tailwind class like "h-4" or a CSS value */
    height?: string;
    /** Makes the skeleton circular */
    circle?: boolean;
}

export const Skeleton = ({ className, width, height, circle }: SkeletonProps) => {
    return (
        <div
            className={cx(
                "animate-pulse bg-gray-200 dark:bg-gray-700",
                circle ? "rounded-full" : "rounded-md",
                width,
                height,
                className
            )}
        />
    );
};

Skeleton.displayName = "Skeleton";
