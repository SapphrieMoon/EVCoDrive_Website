import { memberQueries } from "@/queries/user.query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/utils/date"
import { Label } from "@/components/ui/label"
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Globe,
    Hash,
    Home,
    Fingerprint,
    ShieldCheck,
    ShieldAlert
} from "lucide-react"

export default function ProfilePage() {
    const { data: profileResponse, isLoading } = memberQueries.useGetUserProfile()
    const profile = profileResponse?.data.data

    if (isLoading) {
        return (
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <Skeleton className="h-10 w-[200px]" />
                </div>
                <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
                    <Card className="col-span-4 lg:col-span-2">
                        <CardHeader className="flex flex-col items-center">
                            <Skeleton className="h-32 w-32 rounded-full mb-4" />
                            <Skeleton className="h-8 w-[150px]" />
                            <Skeleton className="h-6 w-[100px] mt-2" />
                        </CardHeader>
                        <CardContent className="space-y-4 mt-4">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                        </CardContent>
                    </Card>

                    <Card className="col-span-4 lg:col-span-5">
                        <CardHeader>
                            <Skeleton className="h-8 w-[200px]" />
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-6 w-full max-w-[200px]" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <User className="h-12 w-12" />
                    <p className="text-lg">Không tìm thấy thông tin hồ sơ.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Hồ sơ cá nhân</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
                {/* Left Column: Avatar and basic info */}
                <Card className="col-span-4 lg:col-span-2 h-fit">
                    <CardHeader className="flex items-center text-center">
                        <Avatar className="h-32 w-32 mb-4 ring-2 ring-primary/10 ring-offset-2">
                            <AvatarImage src={profile.avatarUrl} alt={profile.fullName} className="object-cover" />
                            <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                                {profile.fullName?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-2xl">{profile.fullName || "---"}</CardTitle>
                        <Badge variant="secondary" className="mt-2 capitalize">
                            {profile.role || "---"}
                        </Badge>
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                            {profile.isActive ? (
                                <span className="flex items-center gap-1.5 text-green-600 font-medium">
                                    <ShieldCheck className="h-4 w-4" />
                                    Đang hoạt động
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5 text-destructive font-medium">
                                    <ShieldAlert className="h-4 w-4" />
                                    Ngưng hoạt động
                                </span>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 mt-2">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm font-medium truncate" title={profile.email}>{profile.email || "---"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm font-medium">{profile.phone || "---"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm font-medium">Tham gia: {formatDate(profile.createdAt, false)}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column: Detailed info */}
                <Card className="col-span-4 lg:col-span-5 h-fit">
                    <CardHeader>
                        <CardTitle className="text-xl">Thông tin chi tiết</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-1.5 text-sm">
                                <Label className="text-muted-foreground flex items-center gap-2 mb-1">
                                    <User className="h-4 w-4" /> Giới tính
                                </Label>
                                <p className="font-medium text-base">{profile.gender || "---"}</p>
                            </div>
                            <div className="space-y-1.5 text-sm">
                                <Label className="text-muted-foreground flex items-center gap-2 mb-1">
                                    <Calendar className="h-4 w-4" /> Ngày sinh
                                </Label>
                                <p className="font-medium text-base">
                                    {profile.dateOfBirth ? formatDate(profile.dateOfBirth, false) : "---"}
                                </p>
                            </div>
                            <div className="space-y-1.5 text-sm">
                                <Label className="text-muted-foreground flex items-center gap-2 mb-1">
                                    <Fingerprint className="h-4 w-4" /> CMND/CCCD
                                </Label>
                                <p className="font-medium text-base">{profile.identityCode || "---"}</p>
                            </div>
                            <div className="space-y-1.5 text-sm">
                                <Label className="text-muted-foreground flex items-center gap-2 mb-1">
                                    <Globe className="h-4 w-4" /> Quốc tịch
                                </Label>
                                <p className="font-medium text-base">{profile.nationality || "---"}</p>
                            </div>
                            <div className="space-y-1.5 text-sm">
                                <Label className="text-muted-foreground flex items-center gap-2 mb-1">
                                    <Home className="h-4 w-4" /> Quê quán
                                </Label>
                                <p className="font-medium text-base">{profile.homeTown || "---"}</p>
                            </div>
                            <div className="space-y-1.5 text-sm md:col-span-2">
                                <Label className="text-muted-foreground flex items-center gap-2 mb-1">
                                    <MapPin className="h-4 w-4" /> Địa chỉ hiện tại
                                </Label>
                                <p className="font-medium text-base">{profile.address || "---"}</p>
                            </div>
                            {(profile.latitude !== 0 || profile.longitude !== 0) && (
                                <div className="space-y-1.5 text-sm md:col-span-2">
                                    <Label className="text-muted-foreground flex items-center gap-2 mb-1">
                                        <Hash className="h-4 w-4" /> Tọa độ
                                    </Label>
                                    <p className="font-medium text-base font-mono">
                                        {profile.latitude}, {profile.longitude}
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}