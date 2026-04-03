"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import type { ChartData, GroupByEnum } from "@/types/dashboard.type"

import { formatTick } from "@/utils/date"

dayjs.extend(weekOfYear)

const chartConfig = {
    value: {
        label: "Lượt đặt xe",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig


export function ChartBarMixed({ data, groupBy }: {
    data?: ChartData[]
    groupBy: GroupByEnum
}) {
    if (!data) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Đặt xe</CardTitle>
                <CardDescription>
                    Số lượng xe đã được đặt theo thời gian
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => formatTick(value, groupBy)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            width={32}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => formatTick(value, groupBy)}
                                />
                            }
                        />
                        <Bar
                            dataKey="value"
                            fill="var(--color-value)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
