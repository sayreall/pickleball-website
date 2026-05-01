import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, fullName } = await request.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Email, password, and full name are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Create admin client with service role key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Check if any admin already exists
    const { data: existingAdmins, error: checkError } = await supabaseAdmin
      .from("admin_profiles")
      .select("id")
      .limit(1);

    if (checkError) {
      console.error("Error checking existing admins:", checkError);
      return NextResponse.json(
        { error: "Failed to check existing admins" },
        { status: 500 }
      );
    }

    if (existingAdmins && existingAdmins.length > 0) {
      return NextResponse.json(
        { error: "A head admin already exists. Contact the existing admin to create new accounts." },
        { status: 403 }
      );
    }

    // Create the user with admin metadata
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name: fullName,
        is_admin: true,
        role: "head_admin",
      },
    });

    if (authError) {
      console.error("Error creating user:", authError);
      return NextResponse.json(
        { error: authError.message || "Failed to create user" },
        { status: 500 }
      );
    }

    // Manually insert into admin_profiles (in case trigger doesn't fire)
    const { error: profileError } = await supabaseAdmin
      .from("admin_profiles")
      .upsert({
        id: authData.user.id,
        email: email,
        full_name: fullName,
        role: "head_admin",
      });

    if (profileError) {
      console.error("Error creating admin profile:", profileError);
      // User was created, but profile failed - still return success
      // The trigger should have created it anyway
    }

    return NextResponse.json({
      success: true,
      message: "Head admin account created successfully",
      user: { id: authData.user.id, email: authData.user.email },
    });
  } catch (error) {
    console.error("Setup admin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
