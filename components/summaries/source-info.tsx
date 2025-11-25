import { ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DownloadSummaryButton from "./download-summary-button";

export default function SummaryHeader({
  fileName,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  fileName: string;
  originalFileUrl: string;
  title: string;
  summaryText: string;
  createdAt: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4 text-cyan-400" />
        <span>
          Source: {fileName.charAt(0).toUpperCase() + fileName.slice(1)}
        </span>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-row gap-2">
          <a href={originalFileUrl} target="_blank" rel="noopener moreferrer">
            <Button
              variant={"ghost"}
              size="sm"
              className="h-8 px-3 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
              asChild
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              <span>View Original</span>
            </Button>
          </a>
        </div>
        <DownloadSummaryButton
          title={title}
          summaryText={summaryText}
          fileName={fileName}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
}
