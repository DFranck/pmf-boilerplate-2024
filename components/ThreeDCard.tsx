"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export function ThreeDCard({
  imgSrc,
  title,
  description,
  about,
  page,
}: {
  imgSrc: string;
  title: string;
  description: string;
  about: string;
  page: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card hover:shadow-2xl hover:shadow-secondary-foreground/20  border-border w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-accent-foreground"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-card-foreground text-sm max-w-sm mt-2 "
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={imgSrc}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href={about}
            className="px-4 py-2 rounded-xl text-xs font-normal text-card-foreground"
          >
            More About
          </CardItem>
          {!session?.user ? (
            <CardItem
              translateZ={20}
              as="button"
              onClick={() => {
                router.push("/api/auth/signin");
              }}
              className="px-4 py-2 rounded-xl bg-primary  text-primary-foreground text-xs font-bold"
            >
              Signup to use
            </CardItem>
          ) : (
            <CardItem
              translateZ={20}
              as="button"
              onClick={() => {
                router.push(page);
              }}
              className="px-4 py-2 rounded-xl bg-primary  text-primary-foreground text-xs font-bold"
            >
              Start using
            </CardItem>
          )}
        </div>
      </CardBody>
    </CardContainer>
  );
}
