import { NextResponse } from "next/server";
import manifest  from"../manifest";

export const GET = () => {
  return NextResponse.json(manifest);
};
