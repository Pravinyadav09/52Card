import { MOCK_WEEKS } from "@/lib/mock-data";
import WeekClient from "./WeekClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return MOCK_WEEKS.map((week) => ({
        id: week.id.toString(),
    }));
}

export default async function WeekDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
    // Handling both sync and async params for compatibility
    const resolvedParams = await params;
    const weekId = Number(resolvedParams.id);
    const weekData = MOCK_WEEKS.find(w => w.id === weekId);

    if (!weekData) {
        notFound();
    }

    return <WeekClient weekData={weekData} />;
}
