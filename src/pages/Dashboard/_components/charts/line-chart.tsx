"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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


const chartConfig = {
    value: {
        label: "Doanh thu",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartLineLabel({ data, groupBy }: {
    data?: ChartData[]
    groupBy: GroupByEnum
}) {
    if (!data) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Doanh thu</CardTitle>
                <CardDescription>
                    Doanh thu theo thời gian
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
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
                            width={48}
                            tickFormatter={(value) =>
                                value >= 1_000_000
                                    ? `${(value / 1_000_000).toFixed(1)}M`
                                    : value >= 1_000
                                        ? `${(value / 1_000).toFixed(0)}K`
                                        : value
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    labelFormatter={(value) => formatTick(value, groupBy)}
                                />
                            }
                        />
                        <Line
                            dataKey="value"
                            type="natural"
                            stroke="var(--color-value)"
                            strokeWidth={2}
                            dot={{ fill: "var(--color-value)" }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
