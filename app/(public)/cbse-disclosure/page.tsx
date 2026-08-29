"use client"
import React, { useState, useEffect } from "react"
import { FileText, Download, Pencil, Save, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { isAdminLoggedIn } from "@/lib/admin-session"

type DisclosureRow = {
  no: string
  info: string
  detail: string
  fileUrl?: string
}

type Section = {
  id: string
  label: string
  rows: DisclosureRow[]
}

const initialSections: Section[] = [
  {
    id: "general",
    label: "A. General Information",
    rows: [
      { no: "1", info: "Name of the School", detail: "GURU GORAKSHNATH GYANASTHALI" },
      { no: "2", info: "Affiliation No.", detail: "2134601" },
      { no: "3", info: "School Code", detail: "72425" },
      { no: "4", info: "Complete Address with Pin Code", detail: "Deoria (Vrindavan), Domariaganj, Siddharthnagar, Uttar Pradesh" },
      { no: "5", info: "Principal Name", detail: "—" },
      { no: "6", info: "Principal Qualification", detail: "—" },
      { no: "7", info: "School Email ID", detail: "gggprincipal@gmail.com" },
      { no: "8", info: "Contact Details (Landline/Mobile)", detail: "9794335475" },
    ],
  },
  {
    id: "documents",
    label: "B. Documents and Information",
    rows: [
      { no: "1", info: "Copies of Affiliation/Upgradation Letter and recent extension of affiliation, if any", detail: "—" },
      { no: "2", info: "Copies of Societies/Trust/Company Registration/Renewal Certificate, as applicable", detail: "—" },
      { no: "3", info: "Copy of No Objection Certificate (NOC) issued, if applicable, by the State Govt./UT", detail: "—" },
      { no: "4", info: "Copies of recognition certificate under RTE Act, 2009, and its renewal, if applicable", detail: "—" },
      { no: "5", info: "Copy of Valid Building Safety Certificate as per the National Building Code", detail: "—" },
      { no: "6", info: "Copy of Valid Fire Safety Certificate issued by the competent authority", detail: "—" },
      { no: "7", info: "Copy of the DEO certificate submitted by the school for Affiliation/Upgradation/Extension of Affiliation or Self Certification by school", detail: "—" },
      { no: "8", info: "Copies of valid water, health and sanitation certificates", detail: "—" },
    ],
  },
  {
    id: "results",
    label: "C. Result and Academics",
    rows: [
      { no: "1", info: "Fee structure of the school", detail: "—" },
      { no: "2", info: "Annual Academic Calendar", detail: "—" },
      { no: "3", info: "List of school Management Committee (SMC)", detail: "—" },
      { no: "4", info: "List of Parents Teachers Association (PTA) Members", detail: "—" },
      { no: "5", info: "Last three-year result of the Board Examination as per applicability", detail: "School established in 2024. Board results not yet applicable." },
    ],
  },
  {
    id: "staff",
    label: "D. Staff (Teaching)",
    rows: [
      { no: "1", info: "Principal", detail: "—" },
      { no: "2", info: "Total No. of Teachers (All Categories)", detail: "12+" },
      { no: "3", info: "PGT", detail: "—" },
      { no: "4", info: "TGT", detail: "—" },
      { no: "5", info: "PRT", detail: "—" },
      { no: "6", info: "NTT", detail: "—" },
      { no: "7", info: "Details of Special Educator", detail: "—" },
      { no: "8", info: "Details of Counsellor and Wellness Teacher", detail: "—" },
    ],
  },
  {
    id: "infrastructure",
    label: "E. School Infrastructure",
    rows: [
      { no: "1", info: "Total Campus Area of the School (in sq. mtrs.)", detail: "—" },
      { no: "2", info: "No. and size of the Classrooms (in sq. mtrs.)", detail: "—" },
      { no: "3", info: "No. and size of Laboratories (in sq. mtrs.)", detail: "—" },
      { no: "4", info: "Internet Facility (Y/N)", detail: "Yes" },
      { no: "5", info: "No. of Girls' Toilets", detail: "—" },
      { no: "6", info: "No. of Boys' Toilets", detail: "—" },
      { no: "7", info: "Link of YouTube video of the inspection of school covering the infrastructure of the school", detail: "—" },
    ],
  },
]

function EditableRow({ row, onSave, canEdit }: { row: DisclosureRow; onSave: (detail: string, fileUrl: string) => void; canEdit: boolean }) {
  const [editing, setEditing] = useState(false)
  const [detail, setDetail] = useState(row.detail)
  const [fileUrl, setFileUrl] = useState(row.fileUrl || "")

  function handleSave() {
    onSave(detail, fileUrl)
    setEditing(false)
  }

  function handleCancel() {
    setDetail(row.detail)
    setFileUrl(row.fileUrl || "")
    setEditing(false)
  }

  if (editing) {
    return (
      <tr className="bg-[#fffdf5] border-l-4 border-l-[#FF9933]">
        <td className="px-5 py-3 text-gray-500 font-medium">{row.no}</td>
        <td className="px-5 py-3 text-gray-700 text-sm">{row.info}</td>
        <td className="px-5 py-3">
          <div className="space-y-2">
            <Input value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Enter details..." className="text-sm h-8" />
            <div className="flex items-center gap-2">
              <Upload className="w-3.5 h-3.5 text-gray-400" />
              <Input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="File/Image URL (optional)" className="text-xs h-7 flex-1" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                <Save className="w-3 h-3" /> Save
              </button>
              <button onClick={handleCancel} className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md">
                <X className="w-3 h-3" /> Cancel
              </button>
            </div>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr className="hover:bg-[#f5f9ff] transition-colors group">
      <td className="px-5 py-3 text-gray-500 font-medium">{row.no}</td>
      <td className="px-5 py-3 text-gray-700 text-sm">{row.info}</td>
      <td className="px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            {row.fileUrl ? (
              <a href={row.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#1e40af] hover:text-[#FF9933] font-semibold text-xs transition-colors bg-[#eff6ff] px-3 py-1.5 rounded-lg">
                <Download className="w-3.5 h-3.5" /> View / Download
              </a>
            ) : (
              <span className="text-sm text-gray-800">{row.detail}</span>
            )}
          </div>
          <button
            onClick={() => setEditing(true)}
            className={`${canEdit ? "opacity-0 group-hover:opacity-100" : "hidden"} p-1.5 rounded-md hover:bg-[#FF9933]/10 text-gray-400 hover:text-[#FF9933] transition-all`}
            title="Edit this item"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function CBSEDisclosurePage() {
  const [sections, setSections] = useState(initialSections)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn())
  }, [])

  function handleRowSave(sectionId: string, rowNo: string, newDetail: string, newFileUrl: string) {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              rows: section.rows.map((row) =>
                row.no === rowNo ? { ...row, detail: newDetail, fileUrl: newFileUrl || undefined } : row
              ),
            }
          : section
      )
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#1e40af] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <a href="/" className="hover:text-white">Home</a>
            <span className="text-gray-600">›</span>
            <span className="text-[#FF9933]">CBSE Mandatory Disclosure</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">Mandatory Public Disclosure</h1>
          <p className="mt-3 text-gray-300 text-base md:text-lg max-w-2xl">As per CBSE Affiliation Bye-Laws (Appendix-IX), the following information is disclosed for public access.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full h-6 md:h-10 text-white"><path d="M0 40V20C360 0 720 0 1080 20C1260 30 1350 35 1440 40V40H0Z" fill="currentColor"/></svg>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">

            {/* Info box — only visible to admin */}
            {isAdmin && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <Pencil className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  <strong>Admin mode:</strong> Hover over any row and click the <Pencil className="w-3 h-3 inline" /> icon to edit details or upload documents.
                </p>
              </div>
            )}

            {sections.map((section) => (
              <div key={section.id}>
                <h3 className="text-lg font-bold text-[#1e40af] mb-4 flex items-center gap-2 pb-2 border-b border-gray-200">
                  <FileText className="w-5 h-5 text-[#FF9933]" />
                  {section.label}
                </h3>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-[#eff6ff]">
                      <tr>
                        <th className="text-left px-5 py-3 font-semibold text-[#1e40af] w-12">S.No.</th>
                        <th className="text-left px-5 py-3 font-semibold text-[#1e40af]">Particulars</th>
                        <th className="text-left px-5 py-3 font-semibold text-[#1e40af] w-72">Details / Document</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {section.rows.map((row) => (
                        <EditableRow
                          key={`${section.id}-${row.no}`}
                          row={row}
                          canEdit={isAdmin}
                          onSave={(detail, fileUrl) => handleRowSave(section.id, row.no, detail, fileUrl)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Note */}
            <div className="bg-[#eff6ff] rounded-xl p-6 border border-[#1e40af]/10">
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#1e40af]">Note:</strong> This page follows the CBSE Appendix-IX format for Mandatory Public Disclosure. For any queries, contact us at <a href="mailto:gggprincipal@gmail.com" className="text-[#FF9933] font-semibold hover:underline">gggprincipal@gmail.com</a> or call <a href="tel:9794335475" className="text-[#FF9933] font-semibold hover:underline">9794335475</a>.
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Reference: <a href="https://saras.cbse.gov.in/saras/MandatoryDisclosure/Details" target="_blank" rel="noopener noreferrer" className="text-[#1e40af] hover:underline">CBSE SARAS Portal — Mandatory Disclosure</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
