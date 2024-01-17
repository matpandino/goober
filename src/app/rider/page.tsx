import { Layout } from "@/components/ui/app-layout"
import { SearchTrip } from "./_components/search-trip"

export default function Page() {
    return (
        <Layout
            header={<>Goober</>}
            leftContent={
                <div className="flex flex-col w-full gap-2 bg-background">
                    <SearchTrip />
                </div>
            }
            rightContent={
                <div>
                    TODO: Map integration
                </div>
            }
        />

    )
}