// ui/components/conditionalRender.tsx
"use client";
import Auth from "./auth";

interface ConditionalRenderProps {
    renderIfTrue: React.ReactNode;
    renderIfFalse: React.ReactNode;
}

const ConditionalRender: React.FC<ConditionalRenderProps> = ({ 
    renderIfTrue, 
    renderIfFalse = null,
}) => {
    const isLoggedIn = Auth(); //call the auth function to check if user is logged in
    return isLoggedIn ? <>{renderIfTrue}</> : <>{renderIfFalse}</>;
};

export default ConditionalRender;