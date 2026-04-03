"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { formatDate } from "@/utils/date"

export const description = "A line chart with a label"

const chartConfig = {
    value: {
        label: "Revenue",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartLineLabel({ data, groupBy, onChangeGroupBy }: {
    data?: ChartData[],
    groupBy: GroupByEnum,
    onChangeGroupBy: (groupBy: GroupByEnum) => void
}) {

    if (!data) return null
    return (
        <Card>
            <CardHeader>
                <CardTitle>Line Chart - Label</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => formatDate(value)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="value"
                            type="natural"
                            stroke="var(--color-value)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-value)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            {/* <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            /> */}
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
