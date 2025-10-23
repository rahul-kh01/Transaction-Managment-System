import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { FiDownload, FiFileText, FiCalendar, FiFilter, FiCheckCircle } from "react-icons/fi";
import { useToast } from "../../components/ui/use-toast";
// import { useToast } from "../../hooks/use-toast";

const exportTypes = [
  {
    id: "store-list",
    name: "Store List",
    description: "Complete list of all stores with basic information",
    format: "CSV",
    icon: <FiFileText className="w-5 h-5" />,
  },
  {
    id: "store-status",
    name: "Store Status Summary",
    description: "Summary of store statuses and registration dates",
    format: "Excel",
    icon: <FiFileText className="w-5 h-5" />,
  },
  {
    id: "commission-report",
    name: "Commission Report",
    description: "Detailed commission earnings and rates for all stores",
    format: "Excel",
    icon: <FiFileText className="w-5 h-5" />,
  },
  {
    id: "pending-requests",
    name: "Pending Requests",
    description: "List of all pending store registration requests",
    format: "CSV",
    icon: <FiFileText className="w-5 h-5" />,
  },
];

const recentExports = [
  {
    id: 1,
    type: "Store List",
    date: "2025-01-15 14:30",
    status: "completed",
    size: "2.3 MB",
    downloads: 3,
  },
  {
    id: 2,
    type: "Commission Report",
    date: "2025-01-14 09:15",
    status: "completed",
    size: "1.8 MB",
    downloads: 1,
  },
  {
    id: 3,
    type: "Store Status Summary",
    date: "2025-01-13 16:45",
    status: "completed",
    size: "1.2 MB",
    downloads: 2,
  },
];

export default function ExportsPage() {
  const [selectedType, setSelectedType] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    if (!selectedType) {
      toast({
        title: "Select Export Type",
        description: "Please select an export type to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      const exportType = exportTypes.find(type => type.id === selectedType);
      toast({
        title: "Export Started",
        description: `${exportType.name} export has been initiated. You'll receive a notification when it's ready.`,
      });
      setIsExporting(false);
      setSelectedType("");
      setDateRange({ from: "", to: "" });
    }, 2000);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your file download has begun.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Exports</h2>
        <p className="text-muted-foreground">
          Export store data and generate reports
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Export Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiDownload className="w-5 h-5" />
              Create New Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="export-type">Export Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select export type" />
                </SelectTrigger>
                <SelectContent>
                  {exportTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {type.description}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date-from">From Date</Label>
                <Input
                  id="date-from"
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-to">To Date</Label>
                <Input
                  id="date-to"
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                />
              </div>
            </div>

            <Button 
              onClick={handleExport} 
              disabled={isExporting || !selectedType}
              className="w-full"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <FiDownload className="w-4 h-4 mr-2" />
                  Generate Export
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Export Types Info */}
        <Card>
          <CardHeader>
            <CardTitle>Available Export Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exportTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="text-muted-foreground mt-1">
                    {type.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{type.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {type.format}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Exports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentExports.map((exportItem) => (
              <div
                key={exportItem.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground">
                    <FiFileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{exportItem.type}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-3 h-3" />
                        {exportItem.date}
                      </span>
                      <span>{exportItem.size}</span>
                      <span>{exportItem.downloads} downloads</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={exportItem.status === "completed" ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    <FiCheckCircle className="w-3 h-3" />
                    {exportItem.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(exportItem.id)}
                  >
                    <FiDownload className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {recentExports.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No recent exports found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 