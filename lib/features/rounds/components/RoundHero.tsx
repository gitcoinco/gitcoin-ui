"use client";

import React from "react";
import { Button } from "@/primitives/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/primitives/shadcn/ui/card";
import { Badge } from "@/primitives/shadcn/ui/badge";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { useRound } from "@/features/rounds/hooks/useRounds";

type RoundHeroProps = {
  chainId: string;
  roundId: string;
};

export default function RoundHero(props: RoundHeroProps) {
  // console.log(JSON.stringify(props));

  // const round = useRoundById(props.roundId, { chainId: props.chainId });
  const round = useRound(props.roundId, Number(props.chainId));

  // console.log("okok", JSON.stringify(round, bigIntReplacer));

  return (
    <section className="w-full bg-background py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="col-span-3 flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {round.data?.roundMetadata?.name}
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {/* <Button>Learn More</Button> */}
              <Badge>New Release2</Badge>
              <Button variant="outline">Contact Sales</Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Badge variant="secondary">New Release</Badge>
              <Badge>New Release2</Badge>
              <span className="text-muted-foreground">Version 2.0</span>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Key Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* <PassportWidget round={round} alignment="right" /> */}

              <div className="flex items-center space-x-4">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Release Date</p>
                  <p className="text-sm text-muted-foreground">January 15, 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Availability</p>
                  <p className="text-sm text-muted-foreground">Worldwide</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">Target Audience</p>
                  <p className="text-sm text-muted-foreground">Enterprise & SMBs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="py-12 text-muted-foreground md:text-xl">
          {round.data?.roundMetadata?.eligibility?.description}
        </div>
      </div>
    </section>
  );
}
