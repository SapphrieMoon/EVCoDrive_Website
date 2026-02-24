"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import {
    Zap,
    ArrowRight,
    PlayCircle,
    Calendar,
    CheckCircle2,
    Sparkles,
    TrendingUp,
    Activity,
    FilePlus,
    PieChart,
    Wallet,
    Users,
    RefreshCcw,
    Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const data = [
    { name: "T2", cost: 400, usage: 240 },
    { name: "T3", cost: 300, usage: 139 },
    { name: "T4", cost: 200, usage: 980 },
    { name: "T5", cost: 278, usage: 390 },
    { name: "T6", cost: 189, usage: 480 },
    { name: "T7", cost: 239, usage: 380 },
    { name: "CN", cost: 349, usage: 430 },
];

// --- Sub-components ---

const FeatureCard = ({ icon: IconNode, title, desc }: { icon: any, title: string, desc: string }) => (
    <motion.div whileHover={{ y: -5 }} className="h-full">
        <Card className="h-full border-border/50 shadow-sm hover:shadow-xl hover:border-chart-2/30 transition-all bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-chart-2/10 flex items-center justify-center text-chart-2">
                    <IconNode className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

// --- Main Sections ---

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. HERO SECTION */}
            <section className="relative w-full overflow-hidden bg-background">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-chart-2/10 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-6"
                    >
                        <Badge variant="outline" className="w-fit px-3 py-1 border-chart-2/30 bg-chart-2/10 text-chart-2 gap-2">
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            Nền tảng Đồng Sở Hữu & Chia Sẻ Chi Phí Xe Điện
                        </Badge>

                        <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">
                            Quản lý xe điện chung với sự{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-chart-2 to-primary">
                                Minh bạch
                            </span>{" "}
                            & Công bằng nhờ AI.
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-xl">
                            Đơn giản hóa việc sở hữu chung xe điện. Tự động hoán lịch trình, phân chia chi phí
                            và theo dõi bảo trì với nền tảng thông minh dành cho các nhóm đồng sở hữu hiện đại.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button size="lg" className="bg-gradient-to-r from-chart-2 to-primary text-primary-foreground shadow-lg shadow-chart-2/20 font-semibold border-none">
                                Bắt đầu dùng thử
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="font-semibold">
                                <PlayCircle className="mr-2 w-5 h-5" />
                                Video giới thiệu
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
                            <div><p className="text-2xl font-bold">150+</p><p className="text-sm text-muted-foreground">Nhóm hoạt động</p></div>
                            <div><p className="text-2xl font-bold">35%</p><p className="text-sm text-muted-foreground">Giảm chi phí</p></div>
                            <div><p className="text-2xl font-bold">98%</p><p className="text-sm text-muted-foreground">Tiện ích cao</p></div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-card border border-border/50 rounded-xl shadow-2xl overflow-hidden lg:rotate-y-[-10deg] lg:rotate-x-[5deg] hover:rotate-0 transition-transform duration-700">
                            <div className="h-8 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-chart-2/80" />
                            </div>
                            <div className="p-6 grid grid-cols-12 gap-4 bg-background/50 backdrop-blur-xl min-h-[400px]">
                                <div className="col-span-12 flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold">Bảng điều khiển</h3>
                                    <div className="flex gap-2">
                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none">Cổ phần: 25%</Badge>
                                        <Badge variant="outline">Lịch tiếp: Ngày mai</Badge>
                                    </div>
                                </div>
                                {[
                                    { label: "Sử dụng tháng", value: "1,240 km" },
                                    { label: "Chi phí chung", value: "8.500.000₫" },
                                    { label: "Sức khỏe pin", value: "98%", color: "text-chart-2" }
                                ].map((stat, i) => (
                                    <Card key={i} className="col-span-4 bg-card/50 border-border/50 shadow-none">
                                        <CardContent className="p-3">
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider truncate">{stat.label}</p>
                                            <p className={cn("text-lg sm:text-xl font-semibold truncate", stat.color)}>{stat.value}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                                <div className="col-span-8 h-[180px] mt-2 bg-muted/30 rounded-xl p-2 border border-border/50">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data}>
                                            <defs>
                                                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                                            <Area type="monotone" dataKey="usage" stroke="var(--primary)" fillOpacity={1} fill="url(#colorUsage)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="col-span-4 h-[180px] mt-2 flex flex-col gap-2">
                                    <div className="bg-chart-2/10 p-3 rounded-lg border border-chart-2/20">
                                        <p className="text-[10px] font-bold text-chart-2 uppercase">Gợi ý AI</p>
                                        <p className="text-[11px] mt-1 leading-tight text-muted-foreground">Đề xuất sạc tối ưu ngay.</p>
                                    </div>
                                    <div className="bg-muted/50 p-2 rounded-lg flex-1 border border-border/50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                                            <span className="text-[11px] font-semibold">Hôm nay</span>
                                        </div>
                                        <div className="text-[10px] bg-background p-1.5 rounded border border-border mb-1 truncate">09:00 - Nguyễn Văn A</div>
                                        <div className="text-[10px] bg-primary/20 p-1.5 rounded border border-primary/20 text-primary font-medium truncate">14:00 - Bạn</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-chart-2/10 to-primary/10 blur-[80px] rounded-full opacity-50" />
                    </motion.div>
                </div>
            </section>

            {/* 2. FEATURES SECTION */}
            <section className="py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Mọi thứ bạn cần cho sở hữu chung.</h2>
                        <p className="text-muted-foreground">Bộ công cụ toàn diện cho vòng đời chia sẻ xe điện.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard icon={FilePlus} title="Đăng ký" desc="Đăng ký xe và xác minh tài liệu dễ dàng, nhanh chóng." />
                        <FeatureCard icon={PieChart} title="Quyền sở hữu" desc="Theo dõi tỷ lệ sở hữu và quản lý hợp đồng điện tử." />
                        <FeatureCard icon={Calendar} title="Lịch trình thông minh" desc="Lịch thông minh với AI giải quyết xung đột đặt xe." />
                        <FeatureCard icon={Wallet} title="Theo dõi chi phí" desc="Tự động phân chia chi phí bảo hiểm & sạc điện." />
                        <FeatureCard icon={TrendingUp} title="Phân tích" desc="Thông tin chi tiết về hiệu quả sử dụng so với sở hữu." />
                        <FeatureCard icon={Users} title="Biểu quyết" desc="Ra quyết định dân chủ với nhật ký minh bạch, rõ ràng." />
                    </div>
                </div>
            </section>

            {/* 3. AI MODULES SECTION - ENFORCED DARK THEME */}
            <section className="py-24 bg-zinc-950 text-zinc-50 relative overflow-hidden dark:bg-black">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:30px_30px]" />
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
                    <div>
                        <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 gap-2 pointer-events-none">
                            <Sparkles className="w-4 h-4" /> Powered by AI
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">AI là cốt lõi của EVCoDrive</h2>
                        <p className="text-zinc-400 text-lg mb-8">Các thuật toán tiên tiến đảm bảo sự công bằng và tối ưu hóa giá trị tài sản của bạn.</p>
                        <div className="flex flex-col gap-6">
                            {[
                                { title: "Lịch trình công bằng", desc: "Phân chia suất dựa trên tỷ lệ sở hữu." },
                                { title: "Bảo trì dự đoán", desc: "Dự đoán hao mòn pin & lốp xe." },
                                { title: "Tối ưu hóa giá", desc: "Gợi ý giá cổ phần theo thị trường thực." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <CheckCircle2 className="text-primary w-6 h-6 mt-1" />
                                    <div><h4 className="text-lg font-bold">{item.title}</h4><p className="text-zinc-500">{item.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <Card className="bg-white/5 border-white/10 hover:border-chart-2/50 transition-colors text-white">
                            <CardContent className="flex items-center gap-4 p-5">
                                <div className="bg-primary/20 p-3 rounded-lg text-primary"><TrendingUp /></div>
                                <div className="flex-1"><h4 className="font-bold">Gợi ý giá AI</h4><p className="text-xs text-zinc-400">100.000.000₫ / 5% cổ phần</p></div>
                                <Badge className="bg-chart-2/20 text-chart-2 hover:bg-chart-2/30">Khả thi 82%</Badge>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10 hover:border-chart-2/50 transition-colors text-white">
                            <CardContent className="flex items-center gap-4 p-5">
                                <div className="bg-chart-2/20 p-3 rounded-lg text-chart-2"><Activity /></div>
                                <div className="flex-1"><h4 className="font-bold">Sức khỏe dự đoán</h4><p className="text-xs text-zinc-400">Độ chai pin bình thường.</p></div>
                                <Badge variant="outline" className="text-yellow-500 border-yellow-500/30">Cần chú ý</Badge>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 4. FLOW SECTION */}
            <section className="py-20 border-t bg-background">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold mb-12">Vòng đời toàn diện</h2>
                    <div className="flex flex-wrap justify-center gap-8 items-center">
                        {[
                            { icon: FilePlus, label: "Đăng ký" },
                            { icon: Users, label: "Đồng sở hữu" },
                            { icon: Calendar, label: "Lên lịch" },
                            { icon: Key, label: "Bàn giao" },
                            { icon: Wallet, label: "Thanh toán" },
                            { icon: RefreshCcw, label: "Bán lại" }
                        ].map((step, i, arr) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all">
                                        <step.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-medium">{step.label}</span>
                                </div>
                                {i < arr.length - 1 && <div className="hidden md:block w-12 h-[1px] bg-border" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CTA SECTION */}
            <section className="py-24 bg-gradient-to-br from-primary/20 to-background text-center">
                <div className="max-w-screen-md mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Sẵn sàng hiện đại hóa việc sở hữu xe?</h2>
                    <p className="text-muted-foreground mb-8 text-lg">Tham gia cùng hàng trăm nhóm đang sử dụng AI để tiết kiệm chi phí và giảm tranh chấp.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-chart-2 hover:bg-chart-2/90 text-white font-bold border-none shadow-lg shadow-chart-2/20">Đặt lịch Demo</Button>
                        <Button size="lg" variant="outline">Tải tài liệu</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}