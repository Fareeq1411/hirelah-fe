import { useState } from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import LinkButton from "../components/LinkButton";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

// validation schema (the rules for the form before onSubmit is triggered) using Zod
const formSchema = z.object({
  title: z
    .string()
    .min(1, "Button Title cannot be empty.")
    .max(32, "Button Title must be at most 32 characters."),
  description: z
    .string()
    .min(1, "Link cannot be empty")
    .max(1000, "Link is too long!"),
})

export default function ClientDashboard() {
  // mock data for linktree part
  const [clientLinks, setClientLinks] = useState([
    { id: 1, title: "Visit my website!", url: "#" },
    { id: 2, title: "Visit my Instagram page", url: "#" },
    { id: 3, title: "Visit my TikTok page", url: "#" },
    { id: 4, title: "WhatsApp me for more info!", url: "#" }
  ]);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Set up the hook form basicly to use the zod rules we defined before
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // submit function if zod says yes
  function onSubmit(data) {
    const newLink = {
      id: Date.now(),
      title: data.title,
      url: data.description 
    };
    
    setClientLinks([...clientLinks, newLink]);
    toast.success(`Successfully added: ${data.title}`);
    
    form.reset();
    setIsPopoverOpen(false);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-gray-50 flex flex-col w-full min-h-screen">
        
        <header className="flex h-16 items-center border-b px-4 bg-white shadow-sm shrink-0">
          <SidebarTrigger className="mr-4" />
          <h1 className="text-xl font-semibold text-green-800">Dashboard</h1>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            
            <div className="xl:col-span-1 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-green-900">Profile Settings</h2>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
                 <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                 <Button variant="outline" className="w-full">Change Profile Picture</Button>
              </div>
            </div>

            <div className="xl:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-green-900">Page Editor</h2>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-start gap-6">
                
                <div className="flex gap-3 flex-wrap">
                  <Button variant="outline">Change Page Title</Button>
                  
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">Add New Link</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Card className="w-full sm:max-w-md border-0 shadow-none">
                        <CardHeader>
                          <CardTitle>New Link Button</CardTitle>
                          <CardDescription>
                            Please fill out the form below
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              
                              <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Link Button Title</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter button title here..." autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Link Button URL</FormLabel>
                                    <FormControl>
                                      <Input placeholder="https://..." autoComplete="off" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      Paste the exact URL where this button should go.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="flex gap-2 justify-end pt-4">
                                <Button type="button" variant="outline" onClick={() => {
                                  form.reset();
                                  setIsPopoverOpen(false);
                                }}>
                                  Cancel
                                </Button>
                                <Button type="submit">Submit</Button>
                              </div>

                            </form>
                          </Form>

                        </CardContent>
                      </Card>
                    </PopoverContent>
                  </Popover>

                  <Button variant="secondary">Preview Website</Button>
                </div>
                
                <div className="w-full w-max-md">
                  <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Your Links</p>
                  <div className="w-full max-w-md">
                    {clientLinks.map((link) => (
                      <LinkButton 
                        key={link.id}
                        title={link.title}
                        url={link.url}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}