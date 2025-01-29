import { AuroraText } from "@/components/ui/aurora-text"
import { Atom } from "lucide-react"
import { Link } from "react-router-dom"

const Terms = () => {
  return (
      <main className="flex flex-col flex-grow p-2 overflow-hidden bg-white dark:bg-zinc-900">
          <div className="min-h-screen bg-background text-foreground p-4">
              <div className="max-w-4xl mx-auto">
                <AuroraText className='text-5xl items-center gap-2' ><Atom className='h-11 w-11' /> buildlab</AuroraText>
                  <h1 className="text-4xl mt-6 mb-6">
                    Terms and Conditions
                  </h1>
                  <p className="text-muted-foreground mb-8">Last updated: January 21, 2025</p>
                  <div className="pr-4 space-y-6">
                      <section>
                          <h2 className="text-2xl mb-4">Introduction</h2>
                          <p>Welcome to BuildLab. These Terms and Conditions govern your use of our website. By accessing or using our website, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please refrain from using our website.</p>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">1. Acceptance of Terms</h2>
                          <p>By accessing or using BuildLab, you acknowledge that you have read, understood, and agreed to these Terms. We may modify these Terms at any time without prior notice, and it is your responsibility to check for updates periodically. Continued use of the website following changes signifies your acceptance of the revised Terms.</p>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">2. Use of the Website</h2>
                          <p>You agree to use BuildLab for lawful purposes only and in a manner that does not infringe on the rights of, restrict, or inhibit others' use and enjoyment of the site. Prohibited actions include but are not limited to:</p>
                          <ul className="list-disc pl-6 mt-2">
                              <li>Engaging in any illegal activities.</li>
                              <li>Distributing viruses or any harmful software.</li>
                              <li>Breaching any intellectual property rights.</li>
                              <li>Uploading misleading, defamatory, or abusive content.</li>
                          </ul>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">3. Intellectual Property Rights</h2>
                          <p>All content, including text, graphics, logos, and software available on BuildLab, is the property of the website owner or its licensors and is protected by applicable intellectual property laws in India. You may not reproduce, distribute, or otherwise use any content without obtaining permission from the copyright owner.</p>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">4. User-Generated Content</h2>
                          <p>Any content you upload, post, or share on BuildLab (e.g., comments, feedback, suggestions) will remain your property, but by submitting such content, you grant us a non-exclusive, royalty-free, and worldwide license to use, distribute, and display the content. You are solely responsible for the content you share and must ensure that it does not violate any laws or third-party rights.</p>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">5. Limitation of Liability</h2>
                          <p>BuildLab, its owners, employees, or partners shall not be held liable for any direct, indirect, incidental, or consequential damages arising from your use of the website, including but not limited to:</p>
                          <ul className="list-disc pl-6 mt-2">
                              <li>Loss of data.</li>
                              <li>Technical issues or disruptions.</li>
                              <li>Third-party content accessed through links on the website.</li>
                          </ul>
                          <p className="mt-2">We do not guarantee that the site will be error-free, uninterrupted, or free from viruses or harmful components.</p>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">6. Links to Third-Party Websites</h2>
                          <p>BuildLab may contain links to third-party websites or services, which are not owned or controlled by us. We have no responsibility for the content, privacy policies, or practices of third-party websites. You access any linked website at your own risk.</p>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">7. Privacy Policy</h2>
                          <p>Your use of the website is also governed by our Privacy Policy, which can be found <Link to="/privacy-policy" className="text-primary hover:underline">here</Link>. By using BuildLab, you agree to the collection and use of your personal data as outlined in our Privacy Policy.</p>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">8. Termination of Access</h2>
                          <p>We reserve the right to suspend or terminate your access to BuildLab without prior notice if you violate these Terms or engage in any conduct that we consider harmful to the site or its users.</p>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">9. Governing Law and Jurisdiction</h2>
                          <p>These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Mumbai, India.</p>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">10. Indemnification</h2>
                          <p>You agree to indemnify, defend, and hold harmless BuildLab, its owners, employees, and partners from and against any claims, liabilities, damages, losses, and expenses, including legal fees, arising from your use of the website or violation of these Terms.</p>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">11. Changes to Terms</h2>
                          <p>We may update these Terms and Conditions at any time. We encourage you to review this page periodically for any changes. Continued use of the website following any updates constitutes your acceptance of the revised Terms.</p>
                      </section>

                      <section>
                          <h2 className="text-2xl mb-4">Contact Us</h2>
                          <p>If you have any questions or concerns about these Terms and Conditions, please contact us at:</p>
                          <p className="mt-2">BuildLab</p>
                          <p className='mt-1'>X: <a href="https://x.com/buildlab_ai" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">x.com/buildlab_ai</a></p>
                      </section>
                  </div>
              </div>
          </div>
      </main>
  )
}

export default Terms