import { CardSkeleton } from "@/common/skeletons/card-skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import userQueries from "@/queries/user.query"
import { Briefcase } from "lucide-react"

export default function UserCard({ id, purpose }: { id: string, purpose: string }) {
    const { data, isPending } = userQueries.useGetMemberProfile(id as string)
    const memberProfile = data?.data.data

    if (isPending) return <CardSkeleton />
    if (!memberProfile) return <div>Không tìm thấy thông tin</div>
    return (
        <Card className="p-5 items-start gap-4 shadow-sm flex flex-row">
            <div className="flex-none h-14 w-14 rounded-xl flex items-center justify-center">
                <Avatar>
                    <AvatarImage
                        src={memberProfile?.avatar}
                        alt={memberProfile?.fullName}
                    />
                    <AvatarFallback>
                        {memberProfile?.fullName?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    Thông tin cá nhân
                </div>
                <div className="text-lg font-semibold leading-tight text-foreground">
                    {memberProfile?.fullName}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                    ID: {id}
                </div>
                <div className="text-sm text-muted-foreground italic flex items-center gap-1.5 mt-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{purpose}</span>
                </div>
            </div>
        </Card>
    )
}