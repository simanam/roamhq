import { NextResponse } from "next/server";

interface BrandPayload {
  type: "brand";
  name: string;
  email: string;
  brandName: string;
}

interface FleetPayload {
  type: "fleet";
  name: string;
  email: string;
  companyName: string;
  fleetSize: string;
}

type WaitlistPayload = BrandPayload | FleetPayload;

export async function POST(request: Request) {
  try {
    const payload: WaitlistPayload = await request.json();

    if (!payload.email || !payload.email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (!payload.name) {
      return NextResponse.json(
        { error: "Please provide your name" },
        { status: 400 }
      );
    }

    // Notion API integration
    const notionApiKey = process.env.NOTION_API_KEY;
    const notionDatabaseId = process.env.NOTION_DATABASE_ID;

    if (!notionApiKey || !notionDatabaseId) {
      console.error("Notion API key or Database ID not configured");
      // Still return success to user but log the error
      return NextResponse.json({ success: true });
    }

    // Build properties based on type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const properties: Record<string, any> = {
      Email: {
        title: [
          {
            text: {
              content: payload.email,
            },
          },
        ],
      },
      Name: {
        rich_text: [
          {
            text: {
              content: payload.name,
            },
          },
        ],
      },
      Type: {
        select: {
          name: payload.type === "brand" ? "Brand" : "Fleet",
        },
      },
      "Signed Up": {
        date: {
          start: new Date().toISOString(),
        },
      },
    };

    // Add type-specific fields
    if (payload.type === "brand") {
      properties["Brand Name"] = {
        rich_text: [
          {
            text: {
              content: payload.brandName,
            },
          },
        ],
      };
    } else {
      properties["Company Name"] = {
        rich_text: [
          {
            text: {
              content: payload.companyName,
            },
          },
        ],
      };
      properties["Fleet Size"] = {
        select: {
          name: payload.fleetSize,
        },
      };
    }

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: notionDatabaseId },
        properties,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Notion API error:", errorData);
      // Return success to user even if Notion fails
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
