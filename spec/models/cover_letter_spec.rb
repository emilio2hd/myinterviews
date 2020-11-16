require 'rails_helper'

RSpec.describe CoverLetter, type: :model do
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:content) }
  it { is_expected.to validate_length_of(:title).is_at_most(255) }

  context 'with valid data' do
    let(:attributes) { attributes_for(:cover_letter) }

    subject { CoverLetter.new(attributes) }

    it 'should save successfully' do
      expect(subject.save).to be_truthy
    end
  end
end
