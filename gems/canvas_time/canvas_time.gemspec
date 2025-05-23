# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "canvas_time"
  spec.version       = "1.0.0"
  spec.authors       = ["Raphael Weiner"]
  spec.email         = ["rweiner@pivotallabs.com"]
  spec.summary       = "Canvas Time"

  spec.files         = Dir.glob("{lib,spec}/**/*") + %w[test.sh]
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency "tzinfo"

  spec.add_dependency "activesupport"
end
